import Link from "next/link";

const FormRedirectLinks = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <div className="mt-4 text-center text-sm">
      {isLogin ? "Already have an account?" : "Don&apos;t have an account?"}{" "}
      <Link
        href={isLogin ? "/signup" : "/login"}
        className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline transition-colors"
      >
        {isLogin ? "Sign up" : "Sign in"}
      </Link>
    </div>
  );
};

export default FormRedirectLinks;
