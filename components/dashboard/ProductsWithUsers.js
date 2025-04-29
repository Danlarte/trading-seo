"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSearch, FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";
import { format, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "Fecha no disponible";
    return format(date, "d 'de' MMMM, yyyy", { locale: es });
  } catch (error) {
    return "Fecha no disponible";
  }
};

const ProductsWithUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProductId, setExpandedProductId] = useState(null);

  // Obtener todos los cursos/productos
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("/api/products");
      return response.data;
    },
  });

  // Obtener usuarios con compras
  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users");
      return response.data;
    },
  });

  // Filtrar productos basado en el término de búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const searchLower = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.attributes.titulo.toLowerCase().includes(searchLower)
    );
  }, [products, searchTerm]);

  // Encontrar usuarios que han comprado un producto específico
  const getUsersForProduct = (stripePriceId) => {
    return users.filter(
      (user) => user.compras && user.compras.includes(stripePriceId)
    );
  };

  // Toggle expansión del producto
  const toggleProductExpansion = (productId) => {
    if (expandedProductId === productId) {
      setExpandedProductId(null);
    } else {
      setExpandedProductId(productId);
    }
  };

  if (loadingProducts || loadingUsers) {
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
        Productos y Sus Compradores
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#17498A]">
              Productos Disponibles
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} productos
            </span>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título del producto..."
              className="w-full px-10 py-2 border rounded-lg focus:ring-[#54BCAF] focus:border-[#54BCAF]"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No se encontraron productos
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredProducts.map((product) => {
                const stripePriceId = product.attributes.stripePriceID;
                const productUsers = getUsersForProduct(stripePriceId);

                return (
                  <div
                    key={product.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    {/* Cabecera del acordeón (siempre visible) */}
                    <div
                      className={`p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-all ${
                        expandedProductId === product.id ? "bg-gray-50" : ""
                      }`}
                      onClick={() => toggleProductExpansion(product.id)}
                    >
                      <div>
                        <h3 className="font-medium">
                          {product.attributes.titulo}
                        </h3>

                        <span className="text-xs text-gray-400">
                          Creado: {formatDate(product.attributes.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                          {productUsers.length} compradores
                        </span>
                        <div className="ml-3 text-gray-500 transition-transform duration-200">
                          {expandedProductId === product.id ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contenido del acordeón (visible solo cuando está expandido) */}
                    {expandedProductId === product.id && (
                      <div className="border-t bg-gray-50 p-4 transition-all">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-medium text-gray-600">
                            Usuarios que han comprado este producto:
                          </h4>
                          <span className="text-xs text-gray-500">
                            Stripe Price ID: {stripePriceId}
                          </span>
                        </div>

                        {productUsers.length > 0 ? (
                          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                            {productUsers.map((user) => (
                              <div
                                key={user._id}
                                className="flex items-center bg-white p-3 rounded border"
                              >
                                <div className="flex-shrink-0 mr-3">
                                  <FaUser className="text-gray-400" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {user.name || "Usuario sin nombre"}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            Ningún usuario ha comprado este producto
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsWithUsers;
