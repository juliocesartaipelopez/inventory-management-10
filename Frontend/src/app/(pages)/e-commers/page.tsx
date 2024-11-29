'use client';
import { useGetProductsQuery } from "@/state/api"; 
import { ShoppingCart, User } from "lucide-react";
import { Rating } from "@/app/components/Rating"; 
import Link from "next/link";

const page = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery("");

  if (isLoading) {
    return <div className="text-center py-10">Cargando productos...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center py-10 text-red-500">
        Error al cargar los productos.
      </div>
    );
  }

  // Obtener solo el primer producto
  const product = products[0];

  // Función para agregar el producto al carrito
  const handleAddToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Producto agregado al carrito.");
  };

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="py-3 w-full bg-black text-white text-center">
        <p>¡Nueva temporada! ¡Descuento del 10% en todos los productos! ¡Compruébalo ahora!</p>
      </div>

      <div className="p-4 w-full grid grid-cols-2 px-10">
        <div className="flex gap-20 items-center col-start-1 col-end-2">
          <h1 className="font-bold text-4xl">Jolt</h1>
          <ul className="flex w-full justify-between text-gray-400 font-semibold text-xl">
            <Link href="/e-commers" className="hover:text-black">Categoría</Link>
            <Link href="/collections" className="hover:text-black">Colecciones</Link>
            <Link href="/store" className="hover:text-black">Tienda</Link>
            <Link href="/blog" className="hover:text-black">Blog</Link>
            <Link href="/findStore" className="hover:text-black">Encontrar Tienda</Link>
          </ul>
        </div>

        <div className="col-start-2 col-end-3 flex w-full gap-5 justify-end items-center">
          <div>
            <input type="search" className="w-36 border py-1 rounded-lg" />
          </div>
          <div className="flex gap-2 items-center">
            <ShoppingCart />
            <Link href="/carrito" className="hover:text-black">Carrito 0</Link>
          </div>
          <div className="flex gap-2 items-center">
            <User />
            <Link href="/products">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Detalles del primer producto */}
      {product && (
        <div className="grid grid-cols-2">
            <div className="col-start-1 col-end-2">
              <div className="grid grid-cols-5">
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 grid-rows-4 ">
                    <div className="col-start-1 row-start-1 row-end-2 flex items-centerj justify-center py-2 border-2 shadow-lg rounded-lg">
                      <img src="https://m.media-amazon.com/images/I/71s1PLfmawL._AC_SX466_.jpg" className="w-44" alt="" />
                    </div>
                    <div className="col-start-1 row-start-2 row-end-3 flex items-centerj justify-center py-2 border-2 shadow-lg rounded-lg">
                      <img src="https://m.media-amazon.com/images/I/71kp4-t-33L._AC_SX466_.jpg" className="w-44" alt="" />
                    </div>
                    <div className="col-start-1 row-start-3 row-end-4 flex items-centerj justify-center py-2 border-2 shadow-lg rounded-lg">
                      <img src="https://m.media-amazon.com/images/I/71zwwEe2nLL._AC_SX466_.jpg" className="w-44" alt="" />
                    </div>
                    <div className="col-start-1 row-start-4 row-end-5 flex items-centerj justify-center py-2 border-2 shadow-lg rounded-lg">
                      <img src="https://m.media-amazon.com/images/I/71pO4SDgquL._AC_SX466_.jpg" className="w-44" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-start-2 col-span-4 col-end-6  flex items-centerj justify-center">
                  <img src="https://m.media-amazon.com/images/I/71E7c09iTdL._AC_SX466_.jpg" alt="" />
                </div>
              </div>
            </div>          
            
                <div key={product.productId} className="p-4 flex flex-col">
                  <p className="text-gray-400">Jolt/ Abrigos</p>
                  <div className="text-6xl">
                    {product.name}
                  </div>
                  <div className="text-gray-800 mb-2 pt-8 font-semibold flex text-5xl gap-3">
                    <p className="text-gray-400 flex items-end line-through font-normal text-2xl">
                      $129.00
                    </p>
                    ${product.price.toFixed(2)}
                    <p className="text-xl flex items-center p-1 bg-black text-white rounded-lg">
                      5% Desc
                    </p>
                  </div>
                  <div className="pt-3 pb-2 flex items-center text-2xl font-semibold gap-3">
                    {product.rating && (
                      <div className="flex gap-5">
                        <Rating rating={product.rating} />
                      </div>
                    )}
                    <p>4.9 1,2K Reseñas</p>
                  </div>
                  <div className="text-gray-600 mb-2">
                    <p className="text-3xl py-3 font-semibold">Descripción</p>
                    {product.descriptions || "No disponible"}
                  </div>
                  <div className="text-gray-600 mb-2">
                    <p className="text-3xl py-3 font-semibold">Colores Disponibles</p>
                    <div className="flex gap-4">
                      <div className="p-5 bg-black rounded-lg"></div>
                      <div className="p-5 bg-blue-500 rounded-lg"></div>
                      <div className="p-5 bg-green-500 rounded-lg"></div>
                    </div>
                    <div className="text-2xl">
                      {product.colors?.join(", ") || "No especificados"}
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <p className="text-3xl py-3 font-semibold">Tamaño</p>
                    <div className="py-4 text-4xl">
                      {product.sizes?.join(", ") || "No especificadas"}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => handleAddToCart(product)} className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
        </div>
      )}

      {/* Mostrar otros productos */}
      <div className="grid grid-cols-5 gap-4 mt-10">
        {products.slice(1).map((product: any) => (
          <div key={product.productId} className="border p-4 rounded-lg shadow-md">
            <div className="text-xl font-semibold">{product.name}</div>
            <div className="text-lg text-gray-700">${product.price.toFixed(2)}</div>
            <button 
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
