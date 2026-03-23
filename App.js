// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/quiz")
//       .then(res => setQuizzes(res.data));
//   }, []);

//   const submitQuiz = async () => {
//     const res = await axios.post(
//       `http://localhost:5000/api/quiz/submit/${selected._id}`,
//       { answers }
//     );
//     setResult(res.data);
//   };

//   if (result) {
//     return <h1>Score: {result.score}/{result.total}</h1>;
//   }

//   if (selected) {
//     return (
//       <div>
//         <h2>{selected.title}</h2>
//         {selected.questions.map((q, i) => (
//           <div key={i}>
//             <h3>{q.question}</h3>
//             {q.options.map((opt, j) => (
//               <button
//                 key={j}
//                 onClick={() => {
//                   const newAns = [...answers];
//                   newAns[i] = opt;
//                   setAnswers(newAns);
//                 }}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         ))}
//         <button onClick={submitQuiz}>Submit</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Quiz App</h1>
//       {quizzes.map(q => (
//         <button key={q._id} onClick={() => setSelected(q)}>
//           {q.title}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default App;

function App() {
  return <h1>WORKING NOW 🔥</h1>;
}

export default App;