import AdminOrder from "../features/admin/components/AdminOrder";
import Navbar from "../features/navbar/Navbar";

function AdminOrderPage() {
  return (
    <div className="h-[1400px] bg-background">
      <Navbar>
        <AdminOrder />
      </Navbar>
    </div>
  );
}

export default AdminOrderPage;
