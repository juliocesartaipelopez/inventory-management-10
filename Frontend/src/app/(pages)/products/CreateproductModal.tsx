
import { Header } from "@/app/components/header";
import{v4}from "uuid"
import { ChangeEvent, FormEvent, useState } from "react";

type ProductFormData = {
    name : string;
    price: number;
    stockQuantity: number;
    rating:number;
  };

  type createProductoModalProps = {
    isOpen: boolean;
    onClose: ()=> void;
    onCreate: (FormData: ProductFormData)=>void;
  }

export const CreateproductModal = ({isOpen, onClose, onCreate}: createProductoModalProps) => {
    const [formData, setFormData] = useState({
        productId: v4(),
        name:"",
        price: 0,
        stockQuantity:0,
        rating:0,
    });
    const handlerChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=e.target;
        setFormData({
            ...formData,
            [name]: name === "price"||name === "stockQuantity"|| name === "rating"
            ?parseFloat(value)
            :value,
        });
    };
    const hanldleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        onCreate(formData);
        onClose();
    };
    if (!isOpen) return null;

    const labelCssStyles = "block text-sm font-medium text-gray-700";
    const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md"
  return (
    <div className=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
        <div className="relative to-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <Header name="crear nuevo producto"/>
            <form onSubmit={hanldleSubmit} className="mt-6">
                <label htmlFor="producName" className={labelCssStyles}>
                    Nombre del producto
                </label>
                <input type="text"
                name="name"
                placeholder="ingresa el nombre del producto"
                onChange={handlerChange}
                value={formData.name}
                className={inputCssStyles}
                required />

                <label htmlFor="producPrice" className={labelCssStyles}>
                    Ingresa el precio
                </label>
                <input type="number"
                name="price"
                placeholder="Ingrese el precio del producto"
                onChange={handlerChange}
                value={formData.price}
                className={inputCssStyles}
                required />

                <label htmlFor="producRating" className={labelCssStyles}>
                    Ingresa el rating
                </label>
                <input type="number"
                name="rating"
                placeholder="Ingrese el rating del producto"
                onChange={handlerChange}
                value={formData.rating}
                className={inputCssStyles}
                required />

                <label htmlFor="producQuantity" className={labelCssStyles}>
                    Ingresa el stock
                </label>
                <input type="number"
                name="stockQuantity"
                placeholder="Ingrese el stock del producto"
                onChange={handlerChange}
                value={formData.stockQuantity}
                className={inputCssStyles}
                required />

                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    crear
                </button>
                <button onClick={onClose} className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
                    Cancelar
                </button>
            </form>
        </div>
    </div>
  )
}
