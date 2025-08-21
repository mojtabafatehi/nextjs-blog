import CreatePersonForm from "@/components/dashboard/person/CreatePersonForm";
import ListPersons from "@/components/dashboard/person/ListPersons";

export default function ManagePersons() {
  return (
    <>
      <span className="text-center">مدیریت مداحان و سخنرانان</span>
      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-8 bg-gray-800 p-4 rounded-4xl">
          <CreatePersonForm />
        </div>
        <div className="col-span-4">
          <ListPersons />
        </div>
      </div>
    </>
  );
}
