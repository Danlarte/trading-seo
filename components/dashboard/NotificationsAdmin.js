"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { FaSearch, FaUserTag } from "react-icons/fa";
import config from "@/config";

const fetchUsers = async () => {
  const response = await axios.get("/api/users");
  return response.data;
};

// Función para obtener los planes de los usuarios desde Strapi
const fetchUserPlans = async (userIds) => {
  if (!userIds || userIds.length === 0) return {};
  try {
    console.log(`Consultando planes para ${userIds.length} usuarios`);
    const response = await axios.get("/api/strapi/users-plans", {
      params: { userIds: userIds.join(",") },
    });
    console.log(
      `Recibidos ${Object.keys(response.data || {}).length} planes de usuario`
    );
    return response.data || {};
  } catch (error) {
    console.error("Error fetching user plans from Strapi:", error);
    return {};
  }
};

const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "Fecha no disponible";
    return format(date, "d MMM yyyy", { locale: es });
  } catch (error) {
    return "Fecha no disponible";
  }
};

const NotificationsAdmin = () => {
  const queryClient = useQueryClient();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyMembers, setShowOnlyMembers] = useState(false);
  const [userPlans, setUserPlans] = useState({});
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    category: "system",
    link: "",
    priority: 0,
  });
  const [debugInfo, setDebugInfo] = useState({
    planIds: [],
    plansMapped: false,
    usersWithPurchases: 0,
    usersWithExpertPlan: 0,
    loadingStarted: null,
    loadingFinished: null,
    loadingError: null,
    plansReceived: 0,
  });

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data;
    },
  });

  // Obtener los priceIds de los planes de suscripción
  const subscriptionPriceIds = useMemo(() => {
    const planIds = config.stripe.plans.map((plan) => plan.priceId);
    setDebugInfo((prev) => ({ ...prev, planIds, plansMapped: true }));
    return planIds;
  }, []);

  // Cargar planes de usuarios desde Strapi cuando tengamos la lista de usuarios
  useEffect(() => {
    if (users && users.length > 0) {
      const userIds = users.map((user) => user._id);
      setLoadingPlans(true);
      setDebugInfo((prev) => ({
        ...prev,
        loadingStarted: new Date().toISOString(),
      }));

      fetchUserPlans(userIds)
        .then((plansData) => {
          setUserPlans(plansData);
          setLoadingPlans(false);

          // Contar usuarios con plan EXPERT para debug
          const expertCount = Object.values(plansData).filter(
            (plan) => plan === "EXPERT"
          ).length;
          console.log(
            `Detectados ${expertCount} usuarios con plan EXPERT en Strapi`
          );

          setDebugInfo((prev) => ({
            ...prev,
            usersWithExpertPlan: expertCount,
            loadingFinished: new Date().toISOString(),
            plansReceived: Object.keys(plansData).length,
          }));
        })
        .catch((error) => {
          console.error("Error al cargar planes:", error);
          setLoadingPlans(false);
          setDebugInfo((prev) => ({
            ...prev,
            loadingError: error.message,
            loadingFinished: new Date().toISOString(),
          }));
        });

      // Contar usuarios con compras para debug
      const usersWithPurchases = users.filter(
        (user) =>
          user.compras &&
          Array.isArray(user.compras) &&
          user.compras.some((compra) => subscriptionPriceIds.includes(compra))
      ).length;

      console.log(
        `Detectados ${usersWithPurchases} usuarios con compras de suscripción`
      );

      setDebugInfo((prev) => ({ ...prev, usersWithPurchases }));
    }
  }, [users, subscriptionPriceIds]);

  // Componente de debug para desarrollo
  const DebugPanel = () => {
    if (process.env.NODE_ENV !== "development") return null;

    // Obtener la cantidad de usuarios con plan EXPERT en Strapi
    const expertUsersCount = Object.values(userPlans).filter(
      (plan) => plan === "EXPERT"
    ).length;

    // Obtener la cantidad de usuarios con compras que coincidan con planes de suscripción
    const usersWithMatchingPurchasesCount = users.filter(
      (user) =>
        user.compras &&
        Array.isArray(user.compras) &&
        user.compras.some((compra) => subscriptionPriceIds.includes(compra))
    ).length;

    // Calcular tiempo de carga
    let loadTime = "N/A";
    if (debugInfo.loadingStarted && debugInfo.loadingFinished) {
      const start = new Date(debugInfo.loadingStarted);
      const end = new Date(debugInfo.loadingFinished);
      loadTime = `${((end - start) / 1000).toFixed(2)}s`;
    }

    // Usuarios que son miembros pero no tienen plan EXPERT
    const usersPurchaseNoExpert = memberUsers.filter(
      (user) => userPlans[user._id] !== "EXPERT"
    ).length;

    // Usuarios con plan EXPERT pero sin compras de suscripción
    const usersExpertNoPurchase = memberUsers.filter(
      (user) =>
        userPlans[user._id] === "EXPERT" &&
        (!user.compras ||
          !Array.isArray(user.compras) ||
          !user.compras.some((compra) => subscriptionPriceIds.includes(compra)))
    ).length;

    return (
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-xs">
        <h3 className="font-bold mb-1">Información de Debug:</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p>
              <strong>Planes de suscripción:</strong>
            </p>
            <p>- PriceIds cargados: {debugInfo.planIds.length}</p>
            <p>- IDs: {debugInfo.planIds.join(", ").substring(0, 40)}...</p>
          </div>
          <div>
            <p>
              <strong>Usuarios:</strong>
            </p>
            <p>- Total usuarios: {users.length}</p>
            <p>- Cargando planes: {loadingPlans ? "Sí" : "No"}</p>
            <p>- Tiempo de carga: {loadTime}</p>
          </div>
          <div>
            <p>
              <strong>Miembros detectados:</strong>
            </p>
            <p>- Plan EXPERT en Strapi: {expertUsersCount}</p>
            <p>
              - Con compras de suscripción: {usersWithMatchingPurchasesCount}
            </p>
            <p>- Total miembros únicos: {memberUsers.length}</p>
          </div>
          <div>
            <p>
              <strong>Intersecciones:</strong>
            </p>
            <p>- Miembros sin plan EXPERT: {usersPurchaseNoExpert}</p>
            <p>- EXPERT sin compras: {usersExpertNoPurchase}</p>
            <p>- En caché: {debugInfo.plansReceived} planes</p>
          </div>
        </div>
        {debugInfo.loadingError && (
          <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">
            <p>
              <strong>Error:</strong> {debugInfo.loadingError}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Componente que muestra cuando estamos verificando los planes
  const MembershipStatusIndicator = () => {
    if (loadingPlans) {
      return (
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Verificando
        </span>
      );
    }
    return null;
  };

  // Filtrar usuarios de membresía (con plan EXPERT en Strapi o con compras de suscripción)
  const memberUsers = useMemo(() => {
    return users.filter((user) => {
      // Verificar si el usuario tiene plan EXPERT en Strapi
      if (userPlans[user._id] === "EXPERT") return true;

      // Verificar si el usuario tiene alguna compra que coincida con un plan de suscripción
      if (user.compras && Array.isArray(user.compras)) {
        return user.compras.some((compra) =>
          subscriptionPriceIds.includes(compra)
        );
      }

      return false;
    });
  }, [users, subscriptionPriceIds, userPlans]);

  // Filtrar usuarios basado en el término de búsqueda y si solo se muestran miembros
  const filteredUsers = useMemo(() => {
    // Decidir qué grupo de usuarios filtrar
    const userGroup = showOnlyMembers ? memberUsers : users;

    // Si no hay término de búsqueda, devolver el grupo seleccionado
    if (!searchTerm.trim()) return userGroup;

    // Filtrar por término de búsqueda
    const searchLower = searchTerm.toLowerCase();
    return userGroup.filter(
      (user) =>
        user.email.toLowerCase().includes(searchLower) ||
        (user.name && user.name.toLowerCase().includes(searchLower))
    );
  }, [users, memberUsers, searchTerm, showOnlyMembers]);

  const createNotificationMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/api/notifications", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("notifications");
      toast.success("Notificación creada correctamente");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || "Error al crear la notificación"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUsers.length === 0) {
      toast.error("Selecciona al menos un usuario");
      return;
    }
    createNotificationMutation.mutate({
      ...formData,
      userIds: selectedUsers,
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user._id));
    }
  };

  const toggleMemberFilter = () => {
    // Limpiar selección al cambiar el filtro
    setSelectedUsers([]);
    setShowOnlyMembers(!showOnlyMembers);
  };

  if (loadingUsers) {
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
      <h1 className="text-2xl font-bold text-[#17498A] mb-6">
        Administración de Notificaciones
      </h1>

      {/*   <DebugPanel /> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF] h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
              >
                <option value="info">Información</option>
                <option value="success">Éxito</option>
                <option value="warning">Advertencia</option>
                <option value="error">Error</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
              >
                <option value="system">Sistema</option>
                <option value="webinar">Webinar</option>
                <option value="curso">Curso</option>
                <option value="noticia">Noticia</option>
                <option value="superinvestor">Superinvestor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enlace (opcional)
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridad (0-5)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-[#17498A]">
                  Seleccionar Destinatarios
                </h2>
                <button
                  type="button"
                  onClick={toggleMemberFilter}
                  className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full ${
                    showOnlyMembers
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <FaUserTag size={12} />
                  {showOnlyMembers ? "Solo Miembros" : "Todos los Usuarios"}
                </button>
                <MembershipStatusIndicator />
              </div>
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

            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>
                {showOnlyMembers
                  ? `${memberUsers.length} usuarios con membresía`
                  : `${users.length} usuarios totales`}
              </span>
              <span>{filteredUsers.length} usuarios encontrados</span>
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
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      memberUsers.some((member) => member._id === user._id)
                        ? "bg-indigo-50 hover:bg-indigo-100"
                        : "hover:bg-gray-50"
                    }`}
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
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {user.name || user.email}
                        </p>
                        {loadingPlans ? (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center">
                            <svg
                              className="animate-spin -ml-0.5 mr-1.5 h-2 w-2 text-blue-700"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </span>
                        ) : (
                          memberUsers.some(
                            (member) => member._id === user._id
                          ) && (
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                              Miembro
                            </span>
                          )
                        )}
                      </div>
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
            disabled={createNotificationMutation.isLoading}
            className="bg-[#54BCAF] text-white px-6 py-2 rounded-lg hover:bg-[#3d8a80] transition-colors duration-200 disabled:opacity-50"
          >
            {createNotificationMutation.isLoading
              ? "Enviando..."
              : "Enviar Notificación"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationsAdmin;
