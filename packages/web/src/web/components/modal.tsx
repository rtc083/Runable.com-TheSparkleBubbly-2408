import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
export function Modal({
  open,
  onClose,
  title,
  children,
  drawer = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  drawer?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (open && el && !el.open) {
      el.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && el?.open) el.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={drawer ? "modal cart-dialog" : "modal"}
      aria-label={title}
      onCancel={onClose}
    >
      <div className="modal-inner">
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" onClick={onClose} aria-label="Close dialog">
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
