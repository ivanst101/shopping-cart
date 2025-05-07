function CartItem({ item }) {
  const { id, name, imageUrl, description, price } = item;
  return (
    <div className="group relative flex flex-col gap-y-2 border border-zinc-200 rounded-md bg-white p-10 m-6">
      <img
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        className="group-hover:-translate-y-2 transition-all duration-500"
      />
      <div className="absolute bottom-3 left-5">
        <h1 className="text-sm bg-pink-400 text-white">{name}</h1>
        <span className="text-sm">${price}</span>
      </div>
    </div>
  );
}

export default CartItem;
