"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { FaSearch, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
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

// Función auxiliar para obtener el nombre del plan desde su priceId
const getPlanNameFromPriceId = (priceId) => {
  const plan = config.stripe.plans.find((plan) => plan.priceId === priceId);
  return plan ? plan.name : "Plan desconocido";
};

const PurchasesManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUserId, setExpandedUserId] = useState(null);

  // Obtener usuarios con compras
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data;
    },
  });

  // Obtener cursos para mostrar nombres
  const { data: courses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get("/api/courses");
      return response.data;
    },
  });

  // Mutación para eliminar compra
  const deletePurchaseMutation = useMutation({
    mutationFn: async (purchaseId) => {
      const response = await axios.delete(`/api/purchases/${purchaseId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("purchases");
      toast.success("Compra eliminada correctamente");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Error al eliminar la compra");
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

  // Función para obtener el nombre del curso por su stripePriceId
  const getCourseNameByPriceId = (stripePriceId) => {
    // Verificar si es un plan de suscripción
    const subscriptionPlan = config.stripe.plans.find(
      (plan) => plan.priceId === stripePriceId
    );
    if (subscriptionPlan) {
      return `Suscripción: ${subscriptionPlan.name}`;
    }

    // Verificar si es un curso
    const course = courses.find(
      (course) => course.attributes.stripePriceID === stripePriceId
    );
    return course ? course.attributes.titulo : stripePriceId;
  };

  const handleDeletePurchase = (userId, stripePriceId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta compra?")) {
      deletePurchaseMutation.mutate(stripePriceId);
    }
  };

  // Togglear el estado de expansión del usuario
  const toggleUserExpansion = (userId) => {
    if (expandedUserId === userId) {
      setExpandedUserId(null);
    } else {
      setExpandedUserId(userId);
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
        Gestionar Compras Existentes
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#17498A]">
              Usuarios con Compras
            </h2>
            <span className="text-sm text-gray-500">
              {filteredUsers.length} usuarios
            </span>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por email o nombre..."
              className="w-full px-10 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No se encontraron usuarios con compras
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="border rounded-lg overflow-hidden"
                >
                  {/* Cabecera del acordeón (siempre visible) */}
                  <div
                    className={`p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-all ${
                      expandedUserId === user._id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => toggleUserExpansion(user._id)}
                  >
                    <div>
                      <h3 className="font-medium">
                        {user.name || "Usuario sin nombre"}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <span className="text-xs text-gray-400">
                        Registrado: {formatDate(user.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                        {user.compras?.length || 0} compras
                      </span>
                      <div className="ml-3 text-gray-500 transition-transform duration-200">
                        {expandedUserId === user._id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contenido del acordeón (visible solo cuando está expandido) */}
                  {expandedUserId === user._id && (
                    <div className="border-t bg-gray-50 p-4 transition-all">
                      <h4 className="text-sm font-medium text-gray-600 mb-3">
                        Compras:
                      </h4>
                      {user.compras && user.compras.length > 0 ? (
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                          {user.compras.map((purchaseId) => (
                            <div
                              key={`${user._id}-${purchaseId}`}
                              className="flex items-center justify-between bg-white p-3 rounded border"
                            >
                              <span className="text-sm font-medium">
                                {getCourseNameByPriceId(purchaseId)}
                              </span>
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500 mr-3">
                                  ID: {purchaseId.substring(0, 12)}...
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePurchase(user._id, purchaseId);
                                  }}
                                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors"
                                  title="Eliminar compra"
                                >
                                  <FaTrash size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          No tiene compras registradas
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasesManagement;
