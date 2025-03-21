import { useState, useEffect } from "react";

import {
  FaUser,
  FaBell,
  FaLaptop,
  FaShieldAlt,
  FaCreditCard,
  FaInfoCircle,
} from "react-icons/fa";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Link,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  DesktopWindows,
  Person,
  CreditCard,
  Security,
  Info,
  Logout,
  Menu,
} from "@mui/icons-material";
import { Container } from "@mui/material";
import axios from "axios";
import { Sun, Moon } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Accounts from "./Accounts";
import Products from "./Productspage";
export default function Mainpage() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [currentComponent, setCurrentComponent] = useState(<Products />); // Set default

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch Dark Mode State from API
  useEffect(() => {
    const token = localStorage.getItem("at");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    axios
      .get(
        "https://znginx.perisync.work/api/v1/acc/account/toggleDarkMode?darkMode=false",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setDarkMode(response.data.darkMode);
      })
      .catch((error) => {
        console.error("Error fetching dark mode state:", error);
      });
  }, []);

  // Apply Dark Mode Styling
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "black"; // Make screen black
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "white"; // Restore light mode
    }
  }, [darkMode]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const token = localStorage.getItem("at");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    const newMode = !darkMode; // Toggle the value locally
    setDarkMode(newMode); // Optimistically update UI

    axios
      .get(
        `https://znginx.perisync.work/api/v1/acc/account/toggleDarkMode?darkMode=${newMode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Dark mode updated:", response.data.darkMode);
      })
      .catch((error) => {
        console.error("Error toggling dark mode:", error);
        setDarkMode(!newMode); // Revert state if API call fails
      });
  };

  const handleLogout = () => {
    const token = localStorage.getItem("at");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    axios
      .delete("https://znginx.perisync.work/api/v1/acc/account/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("at"); // Remove auth token
        navigate("/"); // Navigate to login page
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });

    setLogoutModalOpen(false);
  };

  // Show modal when logout button is clicked
  const confirmLogout = () => setLogoutModalOpen(true);

  // const handleNavigateToAccount = async () => {
  //   const token = localStorage.getItem("at");
  //   if (!token) {
  //     console.error("No auth token found");
  //     return;
  //   }

  //   try {
  //     // Fetch the account data before navigation
  //     const response = await axios.get("https://znginx.perisync.work/api/v1/acc/account/read", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     console.log("Account Data:", response.data);

  //     // Pass the fetched data via navigation state (optional)
  //     navigate("/Accounts", { state: { accountData: response.data } });
  //   } catch (error) {
  //     console.error("Error fetching account data:", error);
  //   }
  // };

  return (
    <>
      <div className="sticky top-0 bg-white dark:bg-black dark:text-white z-10">
        {" "}
        <nav className="flex items-center justify-between  bg-white dark:bg-gray-900 px-4 py-2 border-b ">
          <div className="flex">
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu />
            </IconButton>
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <div className=" ">
                <img
                  className="mb-2"
                  src="./public/Screenshot from 2025-02-25 09-24-58.png"
                  alt=""
                />
              </div>
              <span className="font-semibold text-lg dark:text-white">
                Zunoy Accounts
              </span>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 flex items-center rounded-full transition-colors  ${
                darkMode ? "bg-gray-900" : "bg-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transform transition-transform ${
                  darkMode
                    ? "translate-x-4 bg-blue-600"
                    : "translate-x-0 bg-gray-800"
                }`}
              >
                {darkMode ? (
                  <Moon size={18} className="text-white" />
                ) : (
                  <Sun size={18} className="text-white" />
                )}
              </div>
            </button>
            <FaBell className="text-gray-500 dark:text-white cursor-pointer" />
            <FaUser className="text-gray-500 dark:text-white cursor-pointer" />
          </div>
        </nav>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List sx={{ width: 250 }}>
            <ListItem
              button
              onClick={() => {
                setCurrentComponent(<Products />);
                setDrawerOpen(false);
              }}
            >
              <DesktopWindows sx={{ mr: 2 }} />
              <ListItemText primary="All Apps" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setCurrentComponent(<Accounts />);
                setDrawerOpen(false);
              }}
            >
              <Person sx={{ mr: 2 }} />
              <ListItemText primary="Account" />
            </ListItem>

            <ListItem button>
              <ListItemText primary="Billing" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Security" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Support" />
            </ListItem>
            <ListItem
              button
              startIcon={<Logout />}
              onClick={confirmLogout}
              sx={{ color: "red" }}
            >
              <Logout sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <Dialog
          open={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
        >
          <DialogTitle>Confirmation!</DialogTitle>
          <DialogContent>
            <Typography fontWeight="bold">
              Would you like to Logout from Zunoy Accounts?
            </Typography>
            <Typography>
              If you Logout, your session will be deleted.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutModalOpen(false)}>Cancel</Button>
            <Button onClick={handleLogout} color="error" variant="contained">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          borderBottom={1}
          borderColor="divider"
        >
          {/* Left Section - Navigation Tabs */}
          <Box display="flex" alignItems="center" gap={2}>
            <NavItem
              icon={<DesktopWindows />}
              label="All Apps"
              onClick={() => setCurrentComponent(<Products />)}
            />
            <NavItem
              icon={<Person />}
              label="Account"
              onClick={() => setCurrentComponent(<Accounts />)}
            />

            <NavItem sx={{ py: 0.5 }} icon={<CreditCard />} label="Billing" />
            <NavItem icon={<Security />} label="Security" />
            <NavItem icon={<Info />} label="Support" />
          </Box>

          {/* Right Section - Logout Button */}
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={confirmLogout}
          >
            Logout
          </Button>
        </Box>
      </div>
      <div>{currentComponent}</div>
      <Box
        maxWidth="xl"
        sx={{ mx: 10, display: "flex", justifyContent: "space-between" }}
      >
        <Container sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Link href="#" underline="hover" color="primary">
            zunoy.com
          </Link>
          <Link href="#" underline="hover" color="primary">
            Terms of Service
          </Link>
          <Link href="#" underline="hover" color="primary">
            Privacy Policy
          </Link>
          <Link href="#" underline="hover" color="primary">
            Cookie Policy
          </Link>
        </Container>
        <Typography variant="body2" sx={{ mx: 0 }}>
          © 2025 | Zunoy | All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
}
function NavItem({ icon, label, active, onClick }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      px={2}
      py={1}
      borderRadius={2}
      sx={{
        bgcolor: active ? "action.selected" : "transparent",
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
      }}
      onClick={onClick} // Ensure onClick is correctly passed
    >
      <IconButton size="small" color={active ? "primary" : "default"}>
        {icon}
      </IconButton>
      <Typography
        variant="body2"
        fontWeight={active ? "bold" : "normal"}
        color="textPrimary"
      >
        {label}
      </Typography>
    </Box>
  );
}
