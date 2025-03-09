import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, Dropzone, ModalLoading, ModalSuccess } from "@components";
import { ArrowLeft, ArrowRightSmall } from "@icons";

// SWEETALERT
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

import {
  useGetHeroQuery,
  //   useCreateHeroMutation,
  useUpdateHeroMutation,
} from "../../store/slices/heroSlice";

const HeroForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const path = location.pathname.split("/");
  const page = id ? path[path.length - 2] : path.pop();

  const { data, isFetching } = useGetHeroQuery(id, { skip: !id });
  const [updateHero] = useUpdateHeroMutation();

  const [formObject, setFormObject] = useState({
    image: "",
    text: "",
  });

  const getImage = (image) => {
    setFormObject((prev) => ({ ...prev, image }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formObject) {
      if (Array.isArray(formObject[key]) && key === "image") {
        // Untuk properti yang berupa array, append setiap elemen secara terpisah
        formObject[key].forEach((item) => {
          if (item.file) {
            formData.append(key, item.file);
          } else {
            formData.append(key, JSON.stringify(item));
          }
        });
      } else {
        formData.append(key, formObject[key]);
      }
    }
    MySwal.fire({
      html: <ModalLoading />,
      allowOutsideClick: false,
      showConfirmButton: false,
      customClass: {
        popup:
          "rounded-3xl w-auto md:w-[720px] h-[200px] flex justify-center items-center",
      },
    });
    if (id) {
      await updateHero(formData);
    } else {
      await updateHero(formData);
    }
    MySwal.fire({
      html: <ModalSuccess message="This hero was successfully unpublished" />,
      customClass: {
        popup: "rounded-3xl w-auto md:w-[720px]",
      },
      showConfirmButton: false,
      timer: 1000,
    });
    navigate("/dashboard/hero");
    // console.log(formObject);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  useEffect(() => {
    if (data) {
      setFormObject(data.data[0]);
    }
  }, [data]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-10 w-full">
      <Card>
        <form onSubmit={handleSubmit}>
          {/* FORM HEADER */}
          <header className="flex items-baseline justify-between">
            <div>
              <div className="flex gap-4 items-center">
                <Link to="/dashboard/hero">
                  <ArrowLeft />
                </Link>
                <h1 className="text-lg font-medium">
                  {page === "detail" ? "Detail" : id ? "Edit" : "Add"} Hero
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-2 pb-5">
                <Link
                  className="text-primary text-xs font-normal"
                  to="/dashboard"
                >
                  Home
                </Link>
                <ArrowRightSmall />
                <Link
                  className="text-primary text-xs font-normal"
                  to="/dashboard/hero"
                >
                  Hero
                </Link>
                <ArrowRightSmall />
                <Link className="text-primary text-xs font-normal" to="">
                  {page === "detail"
                    ? "Detail Hero"
                    : id
                    ? "Edit Hero"
                    : "Add Hero"}
                </Link>
              </div>
            </div>
          </header>

          {/* FORM INPUTS */}
          <div className="py-6 flex flex-col gap-6 border-t border-surface-border">
            <div className="grid md:grid-cols-2 w-full gap-6">
              {/* Text */}
              <div className="flex flex-col gap-5 w-full md:col-span-2">
                <label className="text-[14.22px]" htmlFor="text">
                  Text
                </label>
                <textarea
                  className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none min-h-[120px] resize-y"
                  id="text"
                  name="text"
                  placeholder="Enter about text"
                  value={formObject.text}
                  onChange={(e) =>
                    setFormObject({ ...formObject, text: e.target.value })
                  }
                  required
                />
              </div>

              {/* Upload */}
              <div className="flex flex-col gap-5 mt-5 w-full md:col-span-2">
                <Dropzone
                  label="Upload Image"
                  multiple={false}
                  hideDropzone={page === "detail"}
                  setData={getImage}
                  data={formObject.image ? [formObject.image] : []}
                />
              </div>
            </div>
          </div>

          {/* FORM BUTTONS */}
          <div className="flex justify-end">
            <div className="flex gap-5">
              <Link
                className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border ${
                  page === "detail"
                    ? "bg-gray-500 text-white"
                    : "border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                }`}
                to="/dashboard/hero"
              >
                {page === "detail" ? "Close" : "Cancel"}
              </Link>
              {page !== "detail" && (
                <button
                  className="rounded-lg w-[100px] h-8 bg-primary text-[12.64px] text-white hover:bg-primary-dark transition-colors"
                  type="submit"
                >
                  {id ? "Save" : "Add Hero"}
                </button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </main>
  );
};

export default HeroForm;
