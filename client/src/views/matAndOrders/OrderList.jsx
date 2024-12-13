

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "../../api/orderApis/deleteOrder";
import { getAllOrders } from "../../api/orderApis/getAllOrders";
import { getAllProjects } from "../../api/projectsAndTaskApis/getAllProjects";
import SimpleSnackbar from "../../components/generalComponents/SnackBar";
import AlertDialog from "../../components/generalComponents/AlertDialog";
import IconColorsOrder from "../../components/orderComponets/IconColorsOrder";
import OrderDetailsModal from "../../components/orderComponets/orderDetailModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Button,
  Paper,
  useMediaQuery,
} from "@mui/material";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchProjectsAndOrders();
  }, []);

  const fetchProjectsAndOrders = async () => {
   
    setLoading(true);
    try {
      const projectResponse = await getAllProjects();

      if(!projectResponse || projectResponse.length === 0 ){
        console.log("no se han encontrado proyectos")
      } else {setProjects(projectResponse || []);}
      
      const orderResponse = await getAllOrders();
      if(!orderResponse || orderResponse.length === 0){
        console.log("No se han encontrado pedidos")
      } else{setOrders(orderResponse || []); }
      
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setSnackbarMessage("Error al cargar los datos");
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (currentOrderId) {
      try {
        await deleteOrder(currentOrderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== currentOrderId)
        );
        setSnackbarMessage("Pedido eliminado con éxito");
      } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        setSnackbarMessage("Error al eliminar el pedido");
      }
      setSnackbarOpen(true);
      closeAlertDialog();
    }
  };

  const openAlertDialog = (orderId) => {
    setCurrentOrderId(orderId);
    setAlertDialogOpen(true);
  };

  const closeAlertDialog = () => {
    setAlertDialogOpen(false);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleToggle = (projectId) => {
    setOpen((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const handleModalOpen = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };
  const handleAddOrder = () => {
    navigate("/create-order");
  };

  const generateMailToLink = (projectId) => {
    const projectOrders = orders.filter(
      (order) => order.projectId === projectId
    );
    const subject = `Detalles de Pedidos para el Proyecto ${projectId}`;
    const body = projectOrders
      .map(
        (order) => `
      ID del Pedido: ${order.orderId}
      Producto: ${order.productName}
      Fecha: ${formatDate(order.date)}
      Estado: ${order.status}
      Descripción: ${order.description}
      Imagen: ${order.image}
    `
      )
      .join("\n\n");

    return `mailto:destinatario@example.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <p>Cargando datos de contacto...</p>;

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      marginTop={"2em"}
    >
      <Box sx={{ marginTop: "2em", width: "90%" }}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Paper
              key={project.projectId}
              elevation={2}
             sx={{
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    marginBottom:"2em",
                    padding: 3,
                    backgroundColor: "#fff",
                   
                    ":hover": {
                      boxShadow: 2,
                    },
                  }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h6">
                  <strong>Proyecto:</strong> {project.projectName}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleToggle(project.projectId)}
                >
                  {open[project.projectId] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}{" "}
                  Pedidos
                </Button>
              </Box>
              <Collapse in={open[project.projectId]}>
                <Box sx={{ marginTop: "2em" }}>
                  {orders.filter(
                    (order) => order.projectId === project.projectId
                  ).length > 0 ? (
                    orders
                      .filter((order) => order.projectId === project.projectId)
                      .map((order) => (
                        <Paper
                          key={order.orderId}
                          elevation={1}
                          sx={{
                            marginBottom: "1em",
                            padding: "1em",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: "10px",
                            transition: "transform 0.3s, background-color 0.3s",
                            flexDirection: isMobile ? "column" : "",
                            ":hover": {
                              transform: "scale(1.02)",
                              backgroundColor: "#fff",
                              color:"#1976D2",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Box sx={{ display: "flex" }}>
                              <IconColorsOrder status={order.status} />
                              
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                justifyContent: "left",
                              }}
                            >
                              <Typography variant="body1">
                                {order.productName}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              onClick={() =>
                                navigate(`/order-details/${order.orderId}`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleModalOpen(order)}>
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => openAlertDialog(order.orderId)}
                            >
                              <DeleteForeverIcon style={{ color: "red" }} />
                            </IconButton>
                          </Box>
                        </Paper>
                      ))
                  ) : (
                    <Typography>No se encontraron pedidos</Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      paddingBottom: "1em",
                    }}
                  >
                    <Button
                      onClick={() => handleAddOrder(project.projectId)}
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        ":hover": { backgroundColor: "#fff", color:"#1976d2"},
                      }}
                    >
                      Agregar pedido <AddCircleIcon />
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "#fff",
                        ":hover": { backgroundColor: "#fff", color:"#1976d2"},
                      }}
                      href={generateMailToLink(project.projectId)}
                    >
                      Enviar por Email <SendIcon />
                    </Button>
                  </Box>
                </Box>
              </Collapse>
            </Paper>
          ))
        ) : (
          <Typography>No se encontraron proyectos</Typography>
        )}
        <SimpleSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          handleClose={closeSnackbar}
        />
        <AlertDialog
          open={alertDialogOpen}
          onClose={closeAlertDialog}
          onConfirm={handleDelete}
          title="Confirmar Eliminación"
          content="¿Estás seguro de que deseas eliminar este pedido? Esta acción es irreversible."
        />
        <OrderDetailsModal
          open={modalOpen}
          onClose={handleModalClose}
          order={selectedOrder}
        />
      </Box>
    </Box>
  );
}

export default OrderList;
