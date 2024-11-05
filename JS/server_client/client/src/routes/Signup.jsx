import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Signup() {

  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // form submit function
  async function formSubmit(data) {
    //to-d0
  }

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit(formSubmit)} method="post" className="w-25">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input {...register("firstName", { required: true })} type="text" className="form-control bg-light" />
          {errors.firstName && <span className="text-danger">First Name is required.</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input {...register("lastName", { required: "Last Name is required." })} type="text" className="form-control bg-light" />
          {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email (username)</label>
          <input {...register("email", { required: "Email is required." })} type="text" className="form-control bg-light" />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input {...register("password", { required: "Password is required." })} type="password" className="form-control bg-light" />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
        <Link to="/login" className="btn btn-outline-dark ms-2">Cancel</Link>
      </form>
    </>
  )
}