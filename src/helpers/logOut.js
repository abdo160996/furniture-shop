export const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully", { autoClose: 2000 });
    } catch (error) {
      toast.error(error.message);
    }
  };
  