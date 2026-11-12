import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";
export const useSubscribe = () => useMutation(orpc.leads.subscribe.mutationOptions());
export const useContact = () => useMutation(orpc.leads.contact.mutationOptions());
