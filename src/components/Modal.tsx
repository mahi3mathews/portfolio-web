import type { ReactElement } from 'react';

type ModalProps = {
  showModal: boolean;
  children: ReactElement;
};
export function Modal({ showModal, children }: ModalProps) {
  return showModal && <div>{children}</div>;
}
