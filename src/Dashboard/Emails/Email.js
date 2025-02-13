import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Email.css";
import Loading from "../../components/Loader";
import URLs from "../../config/urls";

function Emails() {
  const [email, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmails();
  }, []);

  const getEmails = async () => {
    await axios
      .get(URLs.GET_EMAILS, {
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
    <div className="email_table">
      <table className="styled-table-email">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {email &&
            email.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Emails;
