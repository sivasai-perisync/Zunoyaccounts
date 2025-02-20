import React from 'react'

const Mainpage = () => {
    const products = [
        {
          name: "FormFlow",
          tag: "Free",
          description:
            "Streamline submissions, manage data easily, and stay ahead with powerful tools designed to simplify form handling and management.",
          buttonText: "Try Now",
          links: ["Read more", "Documentation", "Raise a Ticket"],
          isNew: true,
        },
        {
          name: "MockAPI",
          tag: "Free",
          description:
            "Seamlessly handle requests, craft precise responses, and elevate integrations with Zunoy MockAPI that redefine API management for developers.",
          buttonText: "Try Now",
          links: ["Read more", "Documentation", "Raise a Ticket"],
          isNew: true,
        },
        {
          name: "WatchTower",
          tag: "Free",
          description:
            "Your complete solution for monitoring site performance, managing incidents, and ensuring optimal uptime.",
          buttonText: "Try Now",
          links: ["Read more", "Documentation", "Raise a Ticket"],
          isNew: true,
        },
        {
          name: "Coming Soon",
          tag: "",
          description: "We're cooking something special...",
          buttonText: "",
          links: [],
          isNew: false,
        },
      ];
    return (
        <div className="min-h-screen bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md text-center"
              >
                <h3 className="text-xl font-semibold">{product.name}</h3>
                {product.isNew && (
                  <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                <p className="mt-3 text-gray-600">{product.description}</p>
                {product.buttonText && (
                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    {product.buttonText}
                  </button>
                )}
                <div className="mt-3 space-y-1">
                  {product.links.map((link, i) => (
                    <a key={i} href="#" className="block text-blue-500 text-sm">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <footer className="mt-10 text-center text-gray-600">
            <p className="font-semibold text-lg">Start saving time today!</p>
            <p>Not just a set of tools, the package includes ready-to-deploy conceptual applications written in JavaScript & TypeScript.</p>
          </footer>
        </div>
      );
}

export default Mainpage

// export default function ProductsPage() {
    // const products = [
    //   {
    //     name: "FormFlow",
    //     tag: "Free",
    //     description:
    //       "Streamline submissions, manage data easily, and stay ahead with powerful tools designed to simplify form handling and management.",
    //     buttonText: "Try Now",
    //     links: ["Read more", "Documentation", "Raise a Ticket"],
    //     isNew: true,
    //   },
    //   {
    //     name: "MockAPI",
    //     tag: "Free",
    //     description:
    //       "Seamlessly handle requests, craft precise responses, and elevate integrations with Zunoy MockAPI that redefine API management for developers.",
    //     buttonText: "Try Now",
    //     links: ["Read more", "Documentation", "Raise a Ticket"],
    //     isNew: true,
    //   },
    //   {
    //     name: "WatchTower",
    //     tag: "Free",
    //     description:
    //       "Your complete solution for monitoring site performance, managing incidents, and ensuring optimal uptime.",
    //     buttonText: "Try Now",
    //     links: ["Read more", "Documentation", "Raise a Ticket"],
    //     isNew: true,
    //   },
    //   {
    //     name: "Coming Soon",
    //     tag: "",
    //     description: "We're cooking something special...",
    //     buttonText: "",
    //     links: [],
    //     isNew: false,
    //   },
    // ];
  
//     return (
//       <div className="min-h-screen bg-gray-100 p-6">
//         <h2 className="text-2xl font-semibold text-center mb-6">Our Products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products.map((product, index) => (
//             <div
//               key={index}
//               className="p-6 bg-white rounded-2xl shadow-md text-center"
//             >
//               <h3 className="text-xl font-semibold">{product.name}</h3>
//               {product.isNew && (
//                 <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full">
//                   NEW
//                 </span>
//               )}
//               <p className="mt-3 text-gray-600">{product.description}</p>
//               {product.buttonText && (
//                 <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//                   {product.buttonText}
//                 </button>
//               )}
//               <div className="mt-3 space-y-1">
//                 {product.links.map((link, i) => (
//                   <a key={i} href="#" className="block text-blue-500 text-sm">
//                     {link}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <footer className="mt-10 text-center text-gray-600">
//           <p className="font-semibold text-lg">Start saving time today!</p>
//           <p>Not just a set of tools, the package includes ready-to-deploy conceptual applications written in JavaScript & TypeScript.</p>
//         </footer>
//       </div>
//     );
//   }
  