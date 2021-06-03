import { createAction } from "@reduxjs/toolkit";

export const updateBlockNumber = createAction("application/updateBlockNumber");
export const setOpenModal = createAction("application/setOpenModal");
export const addPopup = createAction("application/addPopup");
export const removePopup = createAction("application/removePopup");
