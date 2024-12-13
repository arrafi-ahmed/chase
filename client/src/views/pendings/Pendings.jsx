import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { getAllTasks } from "../../api/projectsAndTaskApis/getAllTasks";
import { addPending } from "../../api/pedingApis/handleSubmitPending";
import { getAllOrders } from "../../api/orderApis/getAllOrders";
import { getEmployees } from "../../api/employeeApis/getEmployees";
import { getAllPendings } from "../../api/pedingApis/getAllPendings";
import { deletePending } from "../../api/pedingApis/deletePending";
import VoiceInputNoFormik from "../../components/generalComponents/VoiceInputNoFormik";
import { Button, TextField, IconButton, Box, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function Pendings() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [updatePendings, setUpdatePendings] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const myTasks = await getAllTasks();
        setTasks(myTasks.filter((task) => task.status !== "terminado"));
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    }
    fetchTasks();
  }, []);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const employeesData = await getEmployees();
        setEmployees(
          employeesData.filter(
            (employee) => employee.mandatoryEquipment !== "si"
          )
        );
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    }
    fetchEmployees();
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const orders = await getAllOrders();
        setPendingOrders(
          orders.filter((order) => order.status === "pendiente")
        );
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchPendings() {
      try {
        const pendingData = await getAllPendings();
        setPendings(
          pendingData.filter((pending) => pending.status !== "terminado")
        );
      } catch (error) {
        console.error("Error al obtener los pendientes:", error);
      }
    }
    fetchPendings();
  }, [updatePendings]);

  const validationSchema = yup.object().shape({
    date: yup.date().required("La fecha es requerida"),
    details: yup.string().required("Los detalles son requeridos"),
    
  });

  const handleAddPending = async (values, actions) => {
    const userId = localStorage.getItem('userId'); 
    try {
      const addedPending = await addPending({
        details: values.details.trim(),
        status: "pendiente", 
        date: new Date().toISOString(),
        userId,
        
      });
      setPendings(prevPendings => [...prevPendings, addedPending]);
      setUpdatePendings(!updatePendings);
      actions.resetForm();
    } catch (error) {
      console.error("Failed to add pending:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleDeletePending = async (pendingId) => {
    try {
      await deletePending(pendingId); 
      setPendings((prevPendings) => prevPendings.filter(p => p.pendingId !== pendingId));
    } catch (error) {
      console.error("Failed to delete pending:", error);
    }
  };

  const handleDeleteLocalTask = (taskId) => {
    setTasks(tasks.filter((task) => task.taskId !== taskId));
  };

  const handleDeleteLocalEmployee = (employeeId) => {
    setEmployees(
      employees.filter((employee) => employee.employeeId !== employeeId)
    );
  };

  const handleDeleteLocalOrder = (orderId) => {
    setPendingOrders(
      pendingOrders.filter((order) => order.orderId !== orderId)
    );
  };

  const navigateToDetail = (id, type) => {
    switch (type) {
      case "task":
        navigate(`/edit-task/${id}`);
        break;
      case "employee":
        navigate(`/employee/${id}`);
        break;
      case "order":
        navigate(`/order-details/${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Box
        display="flex"
        padding={3}
        marginTop={"2em"}
        flexDirection="column"
        gap={3}
      >
        <Box
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: 3,
            backgroundColor: "#fff",
            
          }}
        >
          <Formik
            initialValues={{
              date: new Date().toISOString().slice(0, 10),
              details: "",
              status: "pendiente",
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddPending}
          >
            {({ isSubmitting, handleChange, setFieldValue, values }) => (
              <Form>
                <Field
                  as={TextField}
                  label="Nuevo pendiente"
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <VoiceInputNoFormik
                        onTextChange={(text) => setFieldValue("details", text)}
                      />
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: 2,
                    ":hover": { backgroundColor: "#fff", color:"#1976d2"},
                  }}
                  disabled={isSubmitting}
                >
                  Agregar Pendiente
                </Button>
              </Form>
            )}
          </Formik>
        </Box>

        <Box
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: 3,
            backgroundColor: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
            
          }}
        >
          <Typography
            sx={{ paddingLeft: "1em", marginBottom: 2, textAlign: "left" }}
            variant="h6"
          >
            Mis Pendientes creados
          </Typography>
          {pendings.map((pending) => (
            <Box
              key={pending.pendingId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #f0efef",
                marginBottom: "1em",
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: ".5em 1.5em",
                cursor: "pointer",
                ":hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <Typography sx={{ textAlign: "left" }}>
                {pending.date} - {pending.details}
              </Typography>
              <IconButton
                sx={{ color: "red" }}
                edge="end"
                aria-label="delete"
                onClick={() =>
                  handleDeletePending(pending.pendingId)
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
       

        <Box
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: 3,
            backgroundColor: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
           
          }}
        >
          <Typography variant="h6" textAlign={"left"} marginBottom={"1em"}>
            Tareas Pendientes
          </Typography>
          {tasks.map((task) => (
            <Box
              key={task.taskId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #f0efef",
                marginBottom: "1em",
                borderRadius: "5px",
                padding: ".5em 1.5em",
                backgroundColor: "#fff",
                cursor: "pointer",
                ":hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <Typography sx={{ textAlign: "left" }}>
                {task.status} - {task.taskName}
              </Typography>
              <Box>
                <IconButton
                  onClick={() =>
                    navigateToDetail(task.taskId, "task")
                  }
                >
                  <RemoveRedEyeIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "red" }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteLocalTask(task.taskId)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          </Box>
          <Box sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: 3,
            backgroundColor: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
            
          }}> 
          <Typography variant="h6" textAlign={"left"} marginBottom={"1em"}>
            Trabajadores con equipo incompleto
          </Typography>
          {employees.map((employee) => (
            <Box
              key={employee.employeeId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #f0efef",
                marginBottom: "1em",
                borderRadius: "5px",
                padding: ".5em 1.5em",
                backgroundColor: "#fff",
                cursor: "pointer",
                ":hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <Typography sx={{ textAlign: "left" }}>
                {employee.name} - {employee.position}
              </Typography>
              <Box>
                <IconButton
                  onClick={() =>
                    navigateToDetail(employee.employeeId, "employee")
                  }
                >
                  <RemoveRedEyeIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "red" }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteLocalEmployee(employee.employeeId)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        
          </Box>
        <Box
          sx={{
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: 3,
            backgroundColor: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
            
          }}
        >
          <Typography variant="h6" textAlign={"left"} paddingLeft={"1em"}>
            Pedidos Pendientes
          </Typography>
          {pendingOrders.map((order) => (
            <Box
              key={order.orderId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #f0efef",
                marginBottom: "1em",
                backgroundColor: "#fff",
                borderRadius: "5px",
                padding: ".5em 1.5em",
                cursor: "pointer",
                ":hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              <Typography sx={{ textAlign: "left" }}>
                {order.productName}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => navigateToDetail(order.orderId, "order")}
                >
                  <RemoveRedEyeIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "red" }}
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteLocalOrder(order.orderId)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
