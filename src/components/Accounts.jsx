import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Container,
  Paper,
  Grid,
  Avatar,
  Box,
  Button,
  Chip,
  Card,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function Accounts() {
  const location = useLocation();
  const [accountData, setAccountData] = useState(
    location.state?.accountData || null
  );
 
  const [loading, setLoading] = useState(!accountData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (!accountData) {
      const token = localStorage.getItem("at");
      if (!token) {
        console.error("No auth token found");
        return;
      }

      axios
        .get("https://znginx.perisync.work/api/v1/acc/account/read", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAccountData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching account data:", error);
          setLoading(false);
        });
    }
  }, [accountData]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <Box sx={{ width: "100%", p: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {/* Header Section */}

          <div className="flex justify-between items-center">
            {" "}
            <div>
              {" "}
              <div className="flex items-center gap-4">
                <div>
                  <Avatar
                    src={accountData.image?.url}
                    sx={{ width: 80, height: 80 }}
                  />
                </div>

                <div>
                  {" "} <Typography variant="body2" color="textSecondary">
                      {accountData.email.toUpperCase()}
                    </Typography>
                  <Typography variant="h6">{`${accountData.firstName} ${accountData.lastName}`}</Typography>
                  <div>
                    {" "}
                   
                  </div>
                </div>
              </div>
            </div>
            <div>
              {" "}
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Chip
                  label={`Joined on: ${formatDate(accountData.createdAt)}`}
                  sx={{
                    backgroundColor: "white",
                    color: "blue",
                    border: 1,
                    borderColor: "gray",
                    py: 2,
                    px: 1,
                  }}
                  size="small"
                />
              </Box>
            </div>
          </div>

          {/* Profile Information */}
          <Box sx={{ mt: 4 }}>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, borderRadius: 2 }}>
              {/* Left Column */}
              <div className="flex justify-between items-center">
                {" "}
                <div>
                  {" "}
                  <Typography variant="h6">Profile Information</Typography>
                </div>{" "}
                <div>
                  {" "}
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                </div>
              </div>

              <Box display="flex" alignItems="center" mb={2}>
                <PersonIcon fontSize="large" sx={{ mr: 2, color: "gray" }} />
                <Typography variant="body1">
                  <strong className="block">First Name</strong>{" "}
                  {accountData.firstName}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <PersonIcon fontSize="large" sx={{ mr: 2, color: "gray" }} />
                <Typography variant="body1">
                  <strong className="block">Last Name</strong>{" "}
                  {accountData.lastName}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <PhoneIcon fontSize="large" sx={{ mr: 2, color: "gray" }} />
                <Typography variant="body1">
                  <strong className="block">Contact Number</strong>{" "}
                  {accountData.phoneNo || "N/A"}
                </Typography>
              </Box>

              {/* Right Column */}

              <Box display="flex" alignItems="center" mb={2}>
                <BusinessIcon fontSize="large" sx={{ mr: 2, color: "gray" }} />
                <Typography variant="body1">
                  <strong className="block">Organization</strong>{" "}
                  {accountData.organization?.name || "----"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <EmailIcon fontSize="large" sx={{ mr: 2, color: "gray" }} />
                <Typography variant="body1">
                  <strong className="block">Email</strong> {accountData.email}
                  {accountData.metaData?.emailVerified && (
                    <Chip
                      label="Verified"
                      color="success"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                <AccessTimeIcon
                  fontSize="large"
                  sx={{ mr: 2, color: "gray" }}
                />
                <Typography variant="body1">
                  <strong className="block">Last Login At</strong>{" "}
                  {accountData.metaData?.lastLogin
                    ? formatDateTime(accountData.metaData.lastLogin.time)
                    : "N/A"}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Paper>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <Card
          sx={{
            width: "100%",
            py: 3,
            border: 1,
            borderColor: "grey.300",
            borderRadius: 2,
            bgcolor: "white",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
            borderBottom={1}
            borderColor="grey.300"
            pb={1}
            px={3}
          >
            Delete your Account
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={2} px={3}>
            Deleting your Zunoy account is a permanent action that will result
            in the deletion of all your data across Zunoy products. If you're
            sure about proceeding, click the button below to request deletion.
            Once proceeded, our team will contact you to discuss your request
            and understand your decision before finalizing the process.
          </Typography>
          <Box mt={4} px={3} display="flex" justifyContent="start">
            <Button variant="contained" color="error">
              Request Account Deletion
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
