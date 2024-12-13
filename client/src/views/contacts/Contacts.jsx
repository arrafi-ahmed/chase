

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllContacts } from "../../api/contactApi/getAllContacts";
import { ContactMapping } from "../../components/contactComponents/ContactMapping";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
} from "@mui/material";


export default function Contacts() {
  const [open, setOpen] = useState({});
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const allContacts = await getAllContacts();

        // Agrupar contactos por categoría
        const groupedContacts = allContacts.reduce((acc, contact) => {
          const category = contact.category;

          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(contact);
          return acc;
        }, {});

        setData(groupedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const toggleCollapse = (categoryName) => {
    setOpen((prev) => ({ ...prev, [categoryName]: !prev[categoryName] }));
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginBottom={5}
        marginTop="3em"
      >
        <Button
          variant="outlined"
          onClick={() => navigate(`/create-contact`)}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            ":hover": { backgroundColor: "#fff", color:"#1976d2"},
          }}
        >
          <Typography variant="body" paddingRight={1}>
            Agregar contacto
          </Typography>
          <AddCircleIcon />
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: "90%" }}>
          {Object.keys(data).length === 0 ? (
            <Typography>No hay contactos disponibles</Typography>
          ) : (
            Object.keys(data)
              .sort()
              .map((category) => (
                <Paper
                  key={category}
                  sx={{
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                    padding: 3,
                    backgroundColor: "#fff",
                   
                    ":hover": {
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box
                    onClick={() => toggleCollapse(category)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: "#fff",
                     
                     
                    }}
                  >
                    <Typography variant="h6">
                      {ContactMapping[category]?.name || category}
                    </Typography>
                    <IconButton>
                      {open[category] ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </IconButton>
                  </Box>
                  <Collapse in={open[category]} timeout="auto" unmountOnExit>
                    <List>
                      {data[category].map((contactItem) => (
                        <ListItem
                          key={contactItem.contactId}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "1em",
                           ":hover": { backgroundColor: "#f9f9f9" }
                          }}
                        >
                          <ListItemText primary={contactItem.contactName} />
                          <IconButton
                            onClick={() =>
                              navigate(
                                `/contact-details/${contactItem.contactId}`
                              )
                            }
                          >
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Paper>
              ))
          )}
        </Box>
      </Box>
    </>
  );
}
