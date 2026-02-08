import { useState, useEffect } from "react";

function Home() {
  const [items, setItems] = useState([]);
  // const [categorys, setCategorys] = useState([]);

  const hdlGetItem = () => {
    fetch(`https://fakestoreapi.com/products`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        return setItems(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    hdlGetItem();
  }, []);

  const itemCat = [...new Set(items.map((el) => el.category))];
  console.log(itemCat);

  const hdlClick = (e) => {
    console.log(e.target.textContent);
    const catList = items.filter((el) => el.category === e.target.textContent);
    setItems(catList);
  };

  return (
    <>
      <div className="bg-gray-200">
        <div className="bg-orange-400">
          <h1 className="text-3xl">Products Fetch & Filter</h1>
        </div>

        <div className="flex ">
          <hr />
          <button
            onClick={hdlGetItem}
            className="border bg-amber-200 min-w-[200px] flex-grow"
          >
            all
          </button>
          {itemCat.map((el) => (
            <button
              key={el}
              onClick={hdlClick}
              className="border bg-amber-200 min-w-[200px]  flex-grow"
            >
              {el}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="w-[300px] h-[450px] border-[2px] bg-orange-400 rounded-[15px] flex flex-col overflow-hidden "
          >
            <div className="h-[240px] border-b-black basis-auto bg-amber-50 flex-grow overflow-hidden justify-items-center">
              <img src={item.image} alt={item.title} className="h-[200px] " />
            </div>
            <div className="h-[200px]  border-black basis-auto bg-white flex flex-col justify-between  ">
              <p className="text-[21px]"> {item.title}</p>

              <p className="text-[12px] overflow-scroll">{item.description}</p>
              <div className="flex h-[30px] ">
                <p className="bg-gray-300 w-[30%] text-center">{item.price}$</p>
                <button className="bg-orange-400 flex-grow">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
