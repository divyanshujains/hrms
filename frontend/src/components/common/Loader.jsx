import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
    </div>
  );
};

export default Loader;
