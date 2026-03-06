const ActivatePage = () => {
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden p-4">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/20 blur-[120px] animate-blob animation-delay-2000"></div>
      </div>
    </>
  );
};

export default ActivatePage;
