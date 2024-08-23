import { NextResponse } from 'next/server';
import WeakTopic  from '@/models/weakTopicModel';

export async function POST(request) {
  try {
    const req = await request.json();
    const {weakTopic, subject} = req.form;
   const {_id} = req.loggedInUser;

	  const weakTopicDoc = await WeakTopic.create({
		  name: weakTopic,
		  subject: subject,
		  createdBy: _id,
	  });


	  await weakTopicDoc.save();

   const response = NextResponse.json({ success: true});
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
