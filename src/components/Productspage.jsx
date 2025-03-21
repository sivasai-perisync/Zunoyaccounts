import React from "react";
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
function AvatarGroup() {
  const avatars = [
    " ./public/Screenshot from 2025-02-25 17-05-30.png", // Replace with actual image URLs
    "./public/Screenshot from 2025-02-25 17-05-40.png",
    "./public/Screenshot from 2025-02-25 17-05-49.png",
    "./public/Screenshot from 2025-02-25 09-24-58.png",
  ];

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex -space-x-3">
        {avatars.slice(0, 3).map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Avatar ${index}`}
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        ))}
      </div>
      <span className="ml-3 text-gray-600 text-sm font-medium">
        +{avatars.length - 3}
      </span>
    </div>
  );
}
const products = [
  {
    name: "FormFlow",
    isFree: true,
    description:
      "Streamline submissions, manage data easily, and stay ahead with powerful tools designed to simplify form handling and management.",
    buttonText: "Try Now",
    links: ["Read more", "Documentation", "Raise a Ticket"],
    isNew: true,
    img: "./public/Screenshot from 2025-02-25 17-05-30.png",
  },
  {
    name: "MockAPI",
    isFree: true,
    description:
      "Seamlessly handle requests, craft precise responses, and elevate integrations with Zunoy MockAPI that redefine API management for developers.",
    buttonText: "Try Now",
    links: ["Read more", "Documentation", "Raise a Ticket"],
    isNew: true,
    img: "./public/Screenshot from 2025-02-25 17-05-40.png",
  },
  {
    name: "WatchTower",
    isFree: true,
    description:
      "Your complete solution for monitoring site performance, managing incidents, and ensuring optimal uptime.",
    buttonText: "Try Now",
    links: ["Read more", "Documentation", "Raise a Ticket"],
    isNew: true,
    img: "./public/Screenshot from 2025-02-25 17-05-49.png",
  },
  {
    name: "Coming Soon",
    isFree: false,
    description: "",
    buttonText: "",
    links: [],
    isNew: false,
    showAvatars: true, // Flag to indicate avatars should be displayed
    img: "",
  },
];

const Productspage = () => {
  return (
    <div>
      <div className="max-w-[80%] mx-auto p-6">
        <h2 className="text-2xl font-bold text-left my-6">Our Products</h2>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative px-6 bg-white rounded-2xl border mb-12 transition-transform transform py-10 w-full sm:w-full"
            >
              {/* NEW Badge */}
              {product?.isNew && (
                <span className="absolute top-0 right-0 text-sm bg-green-500 text-white px-4 py-1 rounded-tr-xl rounded-bl-xl">
                  NEW
                </span>
              )}

              {/* Title with Icon */}
              <div className="flex items-center space-x-2 mt-4">
                {product.img && (
                  <div className="flex justify-center">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded-lg "
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold">{product.name}</h3>
                {product.isFree && (
                  <span className="text-sm bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                    Free
                  </span>
                )}
              </div>

              {/* Description or Avatar Group */}
              {product.showAvatars ? (
                <AvatarGroup />
              ) : (
                <p className="mt-6 min-h-[135px] font-semibold text-gray-800">
                  {product.description}
                </p>
              )}

              {/* Call to Action Button */}
              {product.buttonText && (
                <button className="my-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  {product.buttonText}
                </button>
              )}

              {/* Links */}
              <div className="mt-3 space-y-1">
                {product.links.map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block text-gray-500 font-semibold text-sm underline"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Box
        sx={{
          background: "radial-gradient( rgb(21, 57, 90),rgb(21, 0, 85))",
          backgroundColor: "#16181E",
          color: "white",
          textAlign: "center",
          py: 12,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Need Help Integrating Zunoy Apps into Your Projects?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Looking to integrate Zunoy’s SaaS products into your workflows or
            need assistance using them in your projects? Our team is here to
            help you get started, streamline your processes, and make the most
            of our tools.
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#6A5ACD", textTransform: "none", px: 3 }}
          >
            Get Integration Support
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default Productspage;
