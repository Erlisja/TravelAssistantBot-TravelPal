// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs'; // Assuming you're using Clerk for authentication
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { db } from '../firebase.js'; // Update the path as necessary
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

export default function FlashcardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  // Fetch flashcards from Firestore when the user is available
  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      try {
        const userDocRef = doc(collection(db, 'users'), user.id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const userFlashcards = userData.flashcards || [];
          setFlashcards(userFlashcards);
        } else {
          // If the user document doesn't exist, create it with an empty flashcards array
          await setDoc(userDocRef, { flashcards: [] });
          setFlashcards([]);
        }
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    }

    getFlashcards();
  }, [user]);

  // Handle card click to navigate to the detailed flashcard page
  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {flashcard.name || flashcard.front || 'Untitled Flashcard'}
                  </Typography>
                  {/* Optionally, display a snippet or other information */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// export default function Flashcard() {
//     const { isLoaded, isSignedIn, user } = useUser()
//     const [flashcards, setFlashcards] = useState([])
//     const router = useRouter()
  
//     // ... (rest of the component)
//     useEffect(() => {
//         async function getFlashcards() {
//           if (!user) return
//           const docRef = doc(collection(db, 'users'), user.id)
//           const docSnap = await getDoc(docRef)
//           if (docSnap.exists()) {
//             const collections = docSnap.data().flashcards || []
//             setFlashcards(collections)
//           } else {
//             await setDoc(docRef, { flashcards: [] })
//           }
//         }
//         getFlashcards()
//       }, [user])
//       return (
//         <Container maxWidth="md">
//           <Grid container spacing={3} sx={{ mt: 4 }}>
//             {flashcards.map((flashcard, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card>
//                   <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
//                     <CardContent>
//                       <Typography variant="h5" component="div">
//                         {flashcard.name}
//                       </Typography>
//                     </CardContent>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       )

//   }

//     const handleCardClick = (id) => {
//     router.push(`/flashcard?id=${id}`)

//     const handleCardClick = (id) => {
//     setFlipped((prev) => ({
//         ...prev,
//         [id]: !prev[id],
//     }))
//     }
//   }

//   return (
//     <Container maxWidth="md">
//       <Grid container spacing={3} sx={{ mt: 4 }}>
//         {flashcards.map((flashcard) => (
//           <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
//             <Card>
//               <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
//                 <CardContent>
//                   <Box sx={{ /* Styling for flip animation */ }}>
//                     <div>
//                       <div>
//                         <Typography variant="h5" component="div">
//                           {flashcard.front}
//                         </Typography>
//                       </div>
//                       <div>
//                         <Typography variant="h5" component="div">
//                           {flashcard.back}
//                         </Typography>
//                       </div>
//                     </div>
//                   </Box>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   )