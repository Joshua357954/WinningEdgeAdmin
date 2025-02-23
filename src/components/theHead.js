import Head from "next/head";
import React from "react";

export default function theHead() {
  return (
    <head>
      <link
        href="/vendor/fontawesome-free/css/all.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet"
      />

      <link href="/css/sb-admin-2.min.css" rel="stylesheet" />

      <link
        href="/vendor/datatables/dataTables.bootstrap4.min.css"
        rel="stylesheet"
      />
    </head>
  );
}
