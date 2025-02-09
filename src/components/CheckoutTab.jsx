import { useState } from "react";
import axios from "axios";
import { AiFillCreditCard } from "react-icons/ai";
const CheckOutTab = () => {
  const [data, setData] = useState({});

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("https://api.hopesdolls.com/api/payment/pay", data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const checkoutData = JSON.stringify({
    amount: 1,
    currency: "USD",
    invoice: "test",
    externalId: 1,
    successCallbackUrl: "",
    failureCallbackUrl: "",
    successRedirectUrl: "",
    failureRedirectUrl: "",
  });

  var config = {
    method: "post",
    url: "https://lb.sandbox.whish.money/itel-service/api/payment/collect",
    headers: {
      channel: "10190736",
      secret: "968b198387044a30846bf958910de1ad",
      websiteurl: "seacproject.vercel.app",
      "Content-Type": "application/json",
    },
    data: checkoutData,
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <form onSubmit={handleCheckout} className="checkout-form">
        <h3>Checkout</h3>
        <div>
          <input name="name" placeholder="Name On Card" onBlur={handleChange} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          <label>
            <AiFillCreditCard />
          </label>
          <input
            style={{ width: "76.6667%" }}
            name="ccNo"
            placeholder="0000 0000 0000 0000"
            onBlur={handleChange}
          />
        </div>
        <div>
          <div
            style={{ display: "flex", gap: "10%", width: "80%" }}
            className="mm-yy"
          >
            <input
              name="expMonth"
              placeholder="MM"
              type="number"
              min={month}
              max="12"
              onChange={handleChange}
              style={{ width: "45%" }}
            />
            <input
              style={{ width: "45%" }}
              name="expYear"
              placeholder="YYYY"
              type="number"
              onBlur={handleChange}
              min={year}
              max={year + 15}
            />
          </div>
        </div>
        <div>
          <input name="cvv" placeholder="CVV" onBlur={handleChange} />
        </div>
        <div>
          <button>SUBMIT</button>
        </div>
      </form>
    </>
  );
};

export default CheckOutTab;
