const PlusMinusInputOne = ({
  className,
  cart_item_id,
  updateCart = () => {},
  amount,
  setCount,
}) => {
  // If minus is clicked
  const onMinusHandler = (e) => {
    e.preventDefault();
    if (amount !== 1) setCount((prev) => prev - 1);
    if (amount === "") setCount(1);
    updateCart({ id: cart_item_id, quantity: amount - 1 });
  };

  // If plus is clicked
  const onPlusHandler = (e) => {
    e.preventDefault();
    if (amount === "") setCount(1);
    else setCount((prev) => prev + 1);
    updateCart({ id: cart_item_id, quantity: amount + 1 });
  };

  // If value is typed in
  const onInputChange = (e) => {
    if (!isNaN(e.target.value)) {
      if (+e.target.value < 1) setCount("");
      else setCount(+e.target.value);
      updateCart({ id: cart_item_id, quantity: +e.target.value });
    }
  };

  return (
    <div className="">
      <div className="">
        <input
          maxLength="2"
          type="number"
          value={amount}
          onChange={onInputChange}
          className="w-20 py-[16px] bg-[#f4f3ef] text-center border-none"
        ></input>
      </div>
    </div>
  );
};

export default PlusMinusInputOne;
