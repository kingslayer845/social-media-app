import { useFormik } from "formik";
import FormInput from "../../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { loginUser } from "../../api/endpoints/auth";
import { LoginUserProps } from "../../types";
import SubmitBtn from "../../components/SubmitBtn";
import { useAuth } from "../../context/AuthContext";
export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation(
    (props: LoginUserProps) => loginUser(props),
    {
      onSuccess: (data) => {
        auth?.login(data.token);
        navigate("/");
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      loginMutation.mutate(values as LoginUserProps);
    },
  });

  return (
    <section>
      <h1 className="text-center py-4 text-2xl font-bold text-blue-400 bg-white mb-6">
        Social App
      </h1>
      <div className="max-w-sm mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 bg-white p-5 rounded-lg"
        >
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
          <SubmitBtn
            isLoading={loginMutation.isLoading}
            text="LOGIN"
            className="bg-blue-400 hover:bg-blue-100 hover:text-blue-400 transition-colors duration-100 text-white py-2 rounded-lg "
          />
          <Link
            to={"/signup"}
            className="text-blue-400 text-sm underline hover:text-blue-200"
          >
            Don't have an account? signup here
          </Link>
        </form>
      </div>
    </section>
  );
}
