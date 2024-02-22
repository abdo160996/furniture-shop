import React from "react";

export default function Footer() {
  const links = {
    Category: [
      {
        name: "Sofas",
        link: "/sofas",
      },
      {
        name: "Chairs",
        link: "/chairs",
      },
      {
        name: "Tables",
        link: "/tables",
      },
      {
        name: "beds",
        link: "/beds",
      },
    ],
    "Popular Products": [
      {
        name: "Elegant Wooden Table",
        link: "/tables",
      },
      {
        name: "Leather Sofa Set",
        link: "/sofas",
      },
      {
        name: "Elegant Coffee Table",
        link: "/tables",
      },
      {
        name: "Vintage Bookshelf",
        link: "/bookshelves",
      },
    ],
    sitemap: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Products",
        link: "/products",
      },
      {
        name: "services",
        link: "/services",
      },
      {
        name: "About",
        link: "/about",
      },
    ],
    "Follow us": [
      {
        name: "Facebook",
        link: "/facebook",
      },
      {
        name: "Twitter",
        link: "/twitter",
      },
      {
        name: "Instagram",
        link: "/instagram",
      },
      {
        name: "Youtube",
        link: "/youtube",
      },
    ],
  };

  
  return (
    <footer className="footer mt-auto fluid-container p-10 grid lg:justify-items-center gap-10 grid-cols-2 lg:grid-cols-5 bg-indigo text-whitesmoke">
      <div className="col-span-2 lg:col-span-1">
        <h1 className="text-3xl font-bold">Logo</h1>
        <p className="py-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
      {Object.entries(links).map(([title, links], index) => (
        <div key={index}>
          <h3 className="font-semibold text-white  mb-2">{title}</h3>
          <ul className="space-y-3 ">
            {links.map((li,index) => (
              <li key={index}>
                <a href={li.link}>{li.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </footer>
  );
}
