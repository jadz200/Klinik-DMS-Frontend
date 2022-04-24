import React, { useEffect, useState } from "react";
import { usePatientsData } from "@hooks/Queries/usePatientsData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useStore } from "../../hooks/Store/useStore";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { baseURL } from "../../utils/baseURL";

const ListPatient = () => {
  let selectedItems = useStore((state) => state.selectedItems);
  const [sendMessage, setSendMessage] = useState(null);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(null);
  let setSelectedItems = useStore((state) => state.setSelectedItems);
  let filter = useStore((state) => state.filter);
  let setCurrentItem = useStore((state) => state.setCurrentItem);
  useEffect(() => {
    setCurrentItem("");
  }, []);

  const { isLoading, data: patients, isError, error } = usePatientsData();
  const navigate = useNavigate();

  const actionButtonsTemplate = (rowData) => {
    return (
      <>
        <Button
          label="New Visit"
          className="p-button-info p-button-sm mr-3"
          onClick={() => {
            navigate(`${rowData.id}/visit/create`);
          }}
        />
        <Button
          label="Send SMS"
          className="p-button-help p-button-sm"
          onClick={() => {
            setSendMessage(rowData);
            setVisible(true);
          }}
        />
      </>
    );
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <DataTable
        selectionMode="multiple"
        selection={selectedItems}
        onSelectionChange={(e) => {
          setSelectedItems(e.value);
        }}
        value={patients.filter(
          (patient) =>
            patient.first_name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.last_name
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.address
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.mail
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase()) ||
            patient.phone
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
        )}
        dataKey="id"
        responsiveLayout="scroll"
        scrollHeight="flex"
        scrollable
        selectionPageOnly
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
        autoLayout={true}
      >
        <Column selectionMode="multiple" style={{ width: "5%" }}></Column>
        <Column
          field="first_name"
          header="First Name"
          style={{ width: "15%" }}
          sortable
        ></Column>
        <Column
          field="last_name"
          header="Last Name"
          style={{ width: "13%" }}
          sortable
        ></Column>
        <Column
          field="phone"
          header="Phone Number"
          style={{ width: "15%" }}
          sortable
        ></Column>
        <Column
          field="mail"
          header="Email"
          style={{
            width: "15%",
          }}
          sortable
        ></Column>
        <Column
          field="address"
          header="Address"
          style={{ width: "12%" }}
          sortable
        ></Column>
        <Column
          header="Actions"
          body={actionButtonsTemplate}
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
      <Dialog
        header={`Send Message to ${sendMessage?.first_name}`}
        style={{ width: "50vw" }}
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
      >
        <InputTextarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          style={{ width: "100%" }}
          rows={5}
        />
        <div className="flex w-full align-content-end justify-content-end mt-5">
          <Button
            label="Send"
            disabled={true}
            onClick={() => {
              setVisible(false);
              axios
                .post(`${baseURL}/sms/patient/${sendMessage?.id}/`, { message })
                .then((resp) => {
                  console.log(resp.data);
                })
                .catch((err) => console.log(err.response));
            }}
          />
        </div>
      </Dialog>
    </>
  );
};

export default ListPatient;
