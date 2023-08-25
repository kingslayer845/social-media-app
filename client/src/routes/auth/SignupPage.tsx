import { useFormik } from "formik";
import FormInput from "../../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { SignupUserProps } from "../../types";
import { useMutation } from "react-query";
import { signupUser } from "../../api/endpoints/auth";
import SubmitBtn from "../../components/SubmitBtn";
import { useAuth } from "../../context/AuthContext";
export default function SignupPage() {
  return (
    <section>
      <h1 className="text-center py-4 text-2xl font-bold text-blue-400 bg-white mb-6">
        Social App
      </h1>
      <div className="max-w-sm mx-auto">
        <SignupForm />
      </div>
    </section>
  );
}

function SignupForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const signupMutation = useMutation(
    (props: SignupUserProps) => signupUser(props),
    {
      onSuccess(data) {
        auth?.login(data.token);
        navigate("/");
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      location: "",
      occupation: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      signupMutation.mutate(values as SignupUserProps);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 bg-white p-5 rounded-lg"
    >
      <FormInput
        type="text"
        name="firstName"
        label="First Name"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      <FormInput
        type="text"
        name="lastName"
        label="Last Name"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      <FormInput
        type="text"
        name="location"
        label="Location"
        onChange={formik.handleChange}
        value={formik.values.location}
      />
      <FormInput
        type="text"
        name="occupation"
        label="Occupation"
        onChange={formik.handleChange}
        value={formik.values.occupation}
      />
      <FormInput
        type="email"
        name="email"
        label="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <FormInput
        type="password"
        name="password"
        label="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <FormInput
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />

      <SubmitBtn text="REGISTER" isLoading={signupMutation.isLoading} />
      <Link
        to={"/login"}
        className="text-blue-400 text-sm underline hover:text-blue-200"
      >
        Already have an account? login here
      </Link>
    </form>
  );
}
