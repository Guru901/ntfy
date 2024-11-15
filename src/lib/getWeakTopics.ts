import axios from "axios";
import { cookies } from "next/headers";

type WeakTopic = {
  id: string;
  name: string;
  subject: string;
};


export async function getWeakTopics(): Promise<{ mathWeakTopics: WeakTopic[], physicsWeakTopics: WeakTopic[], chemistryWeakTopics: WeakTopic[] }> {

  const token = await cookies().then((cookies) => cookies.get("token")) as { value: string }
  const { data: userData } = await axios.post("https://ntfy-blush.vercel.app/api/getLoggedInUser", { token: token.value });

  try {
    const { data } = await axios.post("https://ntfy-blush.vercel.app/api/getWeakTopics", {
      user: userData.user
    });

    console.log('daa', data)

    const formattedData = data.weakTopics.map((doc: any) => {
      const date = new Date(doc.createdAt);
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
      };
      const formattedDate = date
        .toLocaleDateString("en-GB", options)
        .replace(" ", " "); // Ensure there's a space
      return {
        ...doc,
        createdAt: formattedDate,
      };
    });

    const subjectA: WeakTopic[] = [];
    const subjectB: WeakTopic[] = [];
    const subjectC: WeakTopic[] = [];

    formattedData.forEach((doc: any) => {
      if (doc.subject === "Maths") {
        subjectA.push(doc);
      } else if (doc.subject === "Physics") {
        subjectB.push(doc);
      } else if (doc.subject === "Chemistry") {
        subjectC.push(doc);
      }
    });

    const mathWeakTopics = (subjectA.reverse());
    const physicsWeakTopics = (subjectB.reverse());
    const chemistryWeakTopics = (subjectC.reverse());

    return {
      mathWeakTopics,
      physicsWeakTopics,
      chemistryWeakTopics,
    };

  }
  catch (error) {
    return {
      mathWeakTopics: [],
      physicsWeakTopics: [],
      chemistryWeakTopics: [],
    };
  }
}
