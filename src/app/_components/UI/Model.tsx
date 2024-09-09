"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  openForm: boolean;
  handleOpen: () => void;
}
export default function Model({ children, openForm, handleOpen }: IProps) {
  return (
    <>
      <Dialog open={openForm} onClose={handleOpen} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center bg-[#00000057] justify-center p-4">
          <DialogPanel className="w-[500px] space-y-4 border bg-white  rounded-md p-12">
            <DialogTitle className="font-bold">Add New Post</DialogTitle>

            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
