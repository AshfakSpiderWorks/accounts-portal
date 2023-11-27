// import { useForm, Controller } from 'react-hook-form';
// import Select from 'react-select';
// import { useEffect } from 'react';




// const { register, control, setValue, handleSubmit, watch, formState: { errors } } = useForm();


// const options = [
//     { value: "New", label: 'New' },
//     { value: "Accepted", label: 'Accepted' },
//     { value: "Work in Progress", label: 'Work In Progress' },
//     { value: "Completed", label: 'Completed' },
// ];
// const onSubmit = (data) => {
//     console.log(data.status.label);

//     console.log(data);
// };

// return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//         <Controller
//             name="status"
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//                 <Select
//                     {...field}
//                     options={options}
//                     isClearable={true}
//                     placeholder="Select status"
//                 />
//             )}
//         />
//         {errors.status && <p>{errors.status.message}</p>}
//         <button type="submit">Submit</button>

//     </form>
// );
// }
