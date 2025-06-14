const AuthLayout = ({left,right}) => {



  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Image */}
      {left}

      {/* Right Side - Form */}
      {right}
    </div>
  );
};

export default AuthLayout;
