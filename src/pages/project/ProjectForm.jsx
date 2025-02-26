import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, Dropzone, TextEditor } from "@components";
import { ArrowLeft, ArrowRightSmall } from "@icons";

import {
  useGetProjectDetailQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../store/slices/projectSlice";

import { ModalSuccess, ModalLoading } from "@components";

// SWEETALERT
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ProjectForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const path = location.pathname.split("/");
  const page = id ? path[path.length - 2] : path.pop();

  const { data, isLoading } = useGetProjectDetailQuery(id, { skip: !id });
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [formObject, setFormObject] = useState(
    data?.data || {
      title: "",
      link: "",
      images: [],
      cover: "",
      description: "",
      slug: "",
      technologies: [],
      content: "",
      published: false,
    }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormObject((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in formObject) {
      if (Array.isArray(formObject[key]) && key === "images") {
        // Untuk properti yang berupa array, append setiap elemen secara terpisah
        formObject[key].forEach((item) => {
          if(item.file) {
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
      await updateProject(formData);
    } else {
      await createProject(formData);
    }
    MySwal.fire({
      html: (
        <ModalSuccess message="This project was successfully unpublished" />
      ),
      customClass: {
        popup: "rounded-3xl w-auto md:w-[720px]",
      },
      showConfirmButton: false,
      timer: 1000,
    });
    navigate("/dashboard/project");
    // console.log(formObject);
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  const getImages = (images) => {
    setFormObject((prev) => ({ ...prev, images }));
  };

  const getCover = (cover) => {
    setFormObject((prev) => ({ ...prev, cover }));
  };

  useEffect(() => {
    if (data) {
      setFormObject(data.data);
    }
  }, [data]);

  const technologies = [
    { id: "html", label: "HTML" },
    { id: "css", label: "CSS" },
    { id: "javascript", label: "JavaScript" },
    { id: "typescript", label: "TypeScript" },
    { id: "react", label: "React" },
    { id: "nextjs", label: "Next.js" },
    { id: "tailwind", label: "Tailwind CSS" },
    { id: "nodejs", label: "Node.js" },
  ];
  const handleTechChange = (techId) => {
    setFormObject((prev) => {
      const updatedTech = prev.technologies.includes(techId)
        ? prev.technologies.filter((id) => id !== techId)
        : [...prev.technologies, techId];

      return {
        ...prev,
        technologies: updatedTech,
      };
    });
  };
  const handlePublishToggle = () => {
    setFormObject((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  const handleContentChange = (content) => {
    setFormObject((prev) => ({
      ...prev,
      content,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-10 w-full">
      <Card>
        <form onSubmit={handleSubmit}>
          {/* FORM HEADER */}
          <header className="flex items-baseline justify-between">
            <div>
              <div className="flex gap-4 items-center">
                <Link to="/dashboard/project">
                  <ArrowLeft />
                </Link>
                <h1 className="text-lg font-medium">
                  {page === "detail" ? "Detail" : id ? "Edit" : "Add"} Project
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
                  to="/dashboard/project"
                >
                  Project
                </Link>
                <ArrowRightSmall />
                <Link className="text-primary text-xs font-normal" to="">
                  {page === "detail"
                    ? "Detail Project"
                    : id
                    ? "Edit Project"
                    : "Add Project"}
                </Link>
              </div>
            </div>
          </header>

          {/* FORM INPUTS */}
          <div className="py-6 flex flex-col gap-6 border-t border-surface-border">
            <div className="grid md:grid-cols-2 w-full gap-6">
              {/* Project title */}
              <div className="flex flex-col gap-5 w-full">
                <label className="text-[14.22px]" htmlFor="title">
                  Project Title
                </label>
                <input
                  className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                  //   disabled={isDetailPage}
                  id="title"
                  name="title"
                  placeholder="Enter Project Title"
                  required={!id}
                  type="text"
                  value={formObject.title}
                  onChange={handleChange}
                />
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-5 w-full">
                <label className="text-[14.22px]" htmlFor="slug">
                  Slug
                </label>
                <input
                  className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                  //   disabled={isDetailPage}
                  id="slug"
                  name="slug"
                  placeholder="Enter Slug"
                  required={!id}
                  type="text"
                  value={formObject.slug}
                  onChange={handleChange}
                />
              </div>

              {/* Project link */}
              <div className="flex flex-col gap-5 w-full">
                <label className="text-[14.22px]" htmlFor="link">
                  Link
                </label>
                <input
                  className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
                  //   disabled={isDetailPage}
                  id="link"
                  name="link"
                  placeholder="Enter Link"
                  required={!id}
                  type="text"
                  value={formObject.link}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-5 w-full md:col-span-2">
                <label className="text-[14.22px]" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none min-h-[120px] resize-y"
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  value={formObject.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Technologies Checkboxes */}
              <div className="flex flex-col gap-5 w-full md:col-span-2">
                <label className="text-[14.22px]">Technologies</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {technologies.map((tech) => (
                    <div key={tech.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={tech.id}
                        name="technologies"
                        className="w-4 h-4 rounded border-surface-border"
                        checked={formObject.technologies.includes(tech.id)}
                        onChange={() => handleTechChange(tech.id)}
                      />
                      <label
                        htmlFor={tech.id}
                        className="text-[14.22px] text-type-text-light"
                      >
                        {tech.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-5 mt-5 w-full h-60 md:col-span-2 overflow-hidden">
                <p className="text-[14.22px]">Content</p>
                <TextEditor
                  data={formObject.content}
                  onChange={handleContentChange}
                />
              </div>

              {/* Upload */}
              <div className="flex flex-col gap-5 mt-5 w-full md:col-span-2">
                <Dropzone
                  label="Upload Image"
                  data={formObject.images}
                  setData={getImages}
                  multiple={true}
                  cover={formObject.cover}
                  setCover={getCover}
                />
              </div>

              {/* Custom Publish Toggle */}
              <div className="flex flex-col gap-5 w-full md:col-span-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`cursor-pointer p-[2px] w-10 h-[22px] rounded-full transition-all ${
                      formObject.published ? "bg-primary" : "bg-[#D2D2D2]"
                    }`}
                    onClick={handlePublishToggle}
                  >
                    <div
                      className={`h-[18px] w-[18px] rounded-full bg-white transition-all ${
                        formObject.published && "translate-x-full"
                      }`}
                    ></div>
                  </button>
                  <span className="text-[14.22px] text-type-text-light">
                    {formObject.published ? "Published" : "Unpublished"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FORM BUTTONS */}
          <div className="flex justify-end">
            <div className="flex gap-5">
              <Link
                className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border ${
                  page === "detail"
                    ? "bg-type-text-light text-white"
                    : "border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                }`}
                to="/dashboard/project"
              >
                {page === "detail" ? "Close" : "Cancel"}
              </Link>
              {page !== "detail" && (
                <button
                  className="rounded-lg w-[100px] h-8 bg-primary text-[12.64px] text-white hover:bg-primary-dark transition-colors"
                  type="submit"
                >
                  {id ? "Save" : "Add Project"}
                </button>
              )}
            </div>
          </div>
        </form>
      </Card>
    </main>
  );
};

export default ProjectForm;
