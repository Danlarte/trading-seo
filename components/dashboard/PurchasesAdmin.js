"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import config from "@/config";

const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "Fecha no disponible";
    return format(date, "d 'de' MMMM, yyyy", { locale: es });
  } catch (error) {
    return "Fecha no disponible";
  }
};

const PurchasesAdmin = () => {
  const queryClient = useQueryClient();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener usuarios
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data;
    },
  });

  // Obtener cursos
  const { data: courses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get("/api/courses");
      return response.data;
    },
  });

  // Filtrar usuarios basado en el término de búsqueda
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const searchLower = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchLower) ||
        (user.name && user.name.toLowerCase().includes(searchLower))
    );
  }, [users, searchTerm]);

  // Mutación para agregar compra
  const addPurchaseMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/api/purchases", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("purchases");
      toast.success("Compra añadida correctamente");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Error al añadir la compra");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUsers.length === 0) {
      toast.error("Selecciona al menos un usuario");
      return;
    }
    if (!selectedCourse) {
      toast.error("Selecciona un curso");
      return;
    }

    addPurchaseMutation.mutate({
      userIds: selectedUsers,
      stripePriceId: selectedCourse.attributes.stripePriceID,
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user._id));
    }
  };

  if (loadingUsers || loadingCourses) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold text-[#17498A] mb-6">
        Agregar Nuevas Compras
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selección de curso */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-[#17498A] mb-4">
            Seleccionar Curso
          </h2>
          <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCourse?.id === course.id
                    ? "border-[#54BCAF] bg-[#54BCAF]/5"
                    : "border-gray-200 hover:border-[#54BCAF]"
                }`}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#54BCAF]/10 text-[#54BCAF]">
                    <FaShoppingCart size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {course.attributes.titulo}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ID: {course.attributes.stripePriceID}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selección de usuarios */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#17498A]">
                Seleccionar Usuarios
              </h2>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-sm text-[#54BCAF] hover:text-[#3d8a80]"
              >
                {selectedUsers.length === filteredUsers.length
                  ? "Deseleccionar todos"
                  : "Seleccionar todos"}
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por email o nombre..."
                className="w-full px-10 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredUsers.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No se encontraron usuarios
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user._id]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter((id) => id !== user._id)
                          );
                        }
                      }}
                      className="h-4 w-4 text-[#54BCAF] focus:ring-[#54BCAF] rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {user.name || user.email}
                      </p>
                      {user.name && (
                        <p className="text-xs text-gray-500">{user.email}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={addPurchaseMutation.isLoading}
            className="bg-[#54BCAF] text-white px-6 py-2 rounded-lg hover:bg-[#3d8a80] transition-colors duration-200 disabled:opacity-50"
          >
            {addPurchaseMutation.isLoading ? "Agregando..." : "Agregar Compra"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchasesAdmin;
