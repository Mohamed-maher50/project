import { toast } from "react-toastify";
function displayMsg(error, ...options) {
  toast(error, {
    position: options[0]?.position || "bottom-right",

    hideProgressBar: false,

    theme: options[0]?.theme || "light",
    type: options[0]?.type || "error",
  });
}

const asyncToast = () => {
  const id = toast.loading("Please wait...", {
    theme: "light",
    type: "info",
    position: "bottom-right",
    autoClose: 1500,
  });
  return (type, progress) => {
    if (type == "error")
      return toast.update(id, {
        render: "some error happened",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    else if (type == "progress")
      return toast.update(id, {
        render: Math.floor(progress) + "%",
      });
    toast.update(id, {
      render: "All is good",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  };
};

export { displayMsg, asyncToast };
