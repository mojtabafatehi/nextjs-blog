import { getPersons } from "@/app/actions/persons";
import FormComponent from "@/components/dashboard/CreateArchiveForm";

export default async function ArchiveFormPage() {
  const persons = await getPersons();
  console.log(persons);
  return <FormComponent persons={persons} />;
}
