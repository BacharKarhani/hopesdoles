import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Email.css";
import Loading from "../../components/Loader";

function Emails() {
  const [email, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmails();
  }, []);
  const getEmails = async () => {
    await axios
      .get(`https://api.hopesdolls.com/api/emails`, {
        headers: {
          "ngrok-skip-browser-warning": "anyvalue",
        },
      })
      .then((res) => {
        setEmails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading) {
    return (
      <div className="loading_div">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="email_table">
        <table className="styled-table-email">
          <thead>
            <tr>
              <th style={{ textalign: "center" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {email &&
              email.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Emails;
