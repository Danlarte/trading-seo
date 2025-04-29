"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  FaBell,
  FaCheck,
  FaTrash,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import toast from "react-hot-toast";

const NOTIFICATIONS_QUERY_KEY = "notifications";
const UNREAD_NOTIFICATIONS_QUERY_KEY = "unreadNotifications";

const getNotificationStyles = (type) => {
  const styles = {
    info: {
      icon: FaInfoCircle,
      bg: "bg-blue-50",
      text: "text-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      hover: "hover:bg-blue-100/50",
    },
    success: {
      icon: FaCheckCircle,
      bg: "bg-green-50",
      text: "text-green-700",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      hover: "hover:bg-green-100/50",
    },
    warning: {
      icon: FaExclamationTriangle,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      hover: "hover:bg-yellow-100/50",
    },
    error: {
      icon: FaTimesCircle,
      bg: "bg-red-50",
      text: "text-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      hover: "hover:bg-red-100/50",
    },
  };

  return styles[type] || styles.info;
};

const NotificationList = ({ onClose, isMobile = false }) => {
  const queryClient = useQueryClient();

  // Query para obtener las notificaciones
  const { data, isLoading } = useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY],
    queryFn: async () => {
      const response = await axios.get("/api/notifications?limit=5");
      return response.data;
    },
    refetchInterval: 2000,
  });

  // Mutación para marcar como leída
  const markAsReadMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.patch(`/api/notifications/${id}`, {
        read: true,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(NOTIFICATIONS_QUERY_KEY);
      queryClient.invalidateQueries(UNREAD_NOTIFICATIONS_QUERY_KEY);
      toast.success("Notificación marcada como leída");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Error al marcar como leída");
    },
  });

  // Mutación para eliminar
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`/api/notifications/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(NOTIFICATIONS_QUERY_KEY);
      queryClient.invalidateQueries(UNREAD_NOTIFICATIONS_QUERY_KEY);
      toast.success("Notificación eliminada");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Error al eliminar");
    },
  });

  // Mutación para marcar todas como leídas
  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/notifications/mark-all-read");
      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(NOTIFICATIONS_QUERY_KEY);
      await queryClient.cancelQueries(UNREAD_NOTIFICATIONS_QUERY_KEY);

      const previousNotifications = queryClient.getQueryData(
        NOTIFICATIONS_QUERY_KEY
      );

      queryClient.setQueryData(NOTIFICATIONS_QUERY_KEY, (old) => ({
        ...old,
        notifications: old.notifications.map((notification) => ({
          ...notification,
          read: true,
        })),
        unreadCount: 0,
      }));

      queryClient.setQueryData(UNREAD_NOTIFICATIONS_QUERY_KEY, 0);

      return { previousNotifications };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        NOTIFICATIONS_QUERY_KEY,
        context.previousNotifications
      );
      toast.error(
        err.response?.data?.error || "Error al marcar todas como leídas"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(NOTIFICATIONS_QUERY_KEY);
      queryClient.invalidateQueries(UNREAD_NOTIFICATIONS_QUERY_KEY);
      toast.success("Todas las notificaciones marcadas como leídas");
    },
    onSettled: () => {
      queryClient.invalidateQueries(NOTIFICATIONS_QUERY_KEY);
      queryClient.invalidateQueries(UNREAD_NOTIFICATIONS_QUERY_KEY);
    },
  });

  if (isLoading) {
    if (isMobile) return null;
    return (
      <div className="w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] bg-white rounded-lg shadow-xl border border-gray-200">
        <div className="p-4 text-center text-gray-500">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { notifications, unreadCount } = data;

  if (notifications.length === 0) {
    if (isMobile) return null;
    return (
      <div className="w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] bg-white rounded-lg shadow-xl border border-gray-200">
        <div className="p-6 text-center text-gray-500">
          <FaBell size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm">No tienes notificaciones</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center rounded-t-lg">
        <h3 className="font-bold text-[#17498A] text-sm">
          Notificaciones{" "}
          {unreadCount > 0 && (
            <span className="text-[#54BCAF]">({unreadCount})</span>
          )}
        </h3>
      </div>

      <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
        {notifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          const NotificationIcon = styles.icon;

          return (
            <div
              key={notification._id}
              className={`p-4 transition-all duration-200 ${styles.bg} ${
                styles.hover
              } ${!notification.read ? "border-l-4 border-[#54BCAF]" : ""}`}
            >
              <div className="flex gap-3">
                <div
                  className={`p-2 rounded-full h-fit ${
                    !notification.read ? styles.iconBg : "bg-gray-100"
                  } ${!notification.read ? styles.iconColor : "text-gray-400"}`}
                >
                  <NotificationIcon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium ${styles.text} text-sm`}>
                    {notification.title}
                  </h4>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  {notification.link && (
                    <a
                      href={notification.link}
                      onClick={onClose}
                      className="inline-flex items-center text-xs text-[#54BCAF] hover:text-[#3d8a80] mt-2 font-medium"
                    >
                      Ver más
                      <FaExternalLinkAlt size={10} className="ml-1" />
                    </a>
                  )}
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                    <span>
                      {format(
                        new Date(notification.createdAt),
                        "d 'de' MMMM, HH:mm",
                        {
                          locale: es,
                        }
                      )}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{notification.category}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-2">
                  {!notification.read && (
                    <button
                      onClick={() =>
                        markAsReadMutation.mutate(notification._id)
                      }
                      className={`p-1.5 text-gray-400 hover:${styles.iconColor} transition-colors duration-200`}
                      title="Marcar como leída"
                    >
                      <FaCheck size={12} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMutation.mutate(notification._id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    title="Eliminar"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationList;
