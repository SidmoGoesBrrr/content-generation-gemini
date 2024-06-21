"use client"; // Add this at the top of the file
import MarkdownRenderer from '../../components/markdownRenderer';
import {ClimbingBoxLoader} from 'react-spinners'

import BackgroundBoxesDemo from "../../components/demo";
import { createBlog } from "../../utils/blog"; // Import the function that handles the backend logic
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const categories = ["AIC RMP", "Niti Aayog", "Indian Startups", "Grassroot Level", "Innovative Solution", "Agritech"];

interface Result {
    blogContent: string;
}

export default function Home() {
    const [result, setResult] = useState<{ message: string } | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [customPrompt, setCustomPrompt] = useState<string>("");

    const handleCategoryChange = (value: string) => {
        setSelectedCategories(prevSelectedCategories =>
            prevSelectedCategories.includes(value)
                ? prevSelectedCategories.filter(category => category !== value)
                : [...prevSelectedCategories, value]
        );
    };
    const defaultPrompt = `Write a blog on categories: {selected_categories} and use case studies if needed: {news_articles}. Do not write about information related to coin or crypto technologies. Keep the word count at 1000 words.`;

    const validatePrompt = (prompt: string) => {
        if (!prompt.includes("{selected_categories}")) {
            alert("The prompt must include {selected_categories}");
            return false;
        }
        return true;
    };

    const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomPrompt(event.target.value);
    };



    return (
        <>
            <BackgroundBoxesDemo />
            <ToggleGroup
                type="multiple"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {categories.map((category, index) => (
                    <ToggleGroupItem
                        key={index}
                        value={category}
                        aria-label={category}
                        className={`bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-700 ${selectedCategories.includes(category) ? 'bg-blue-700' : ''}`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            <div className="mt-8 text-center">
                <textarea
                    className="w-full p-4 border rounded mx-4"
                    rows={5}
                    value={customPrompt || defaultPrompt}
                    onChange={handlePromptChange}
                    style={{ border: "3px solid #cbd5e1"}}
                />
                <small className="block mt-2 text-gray-600">
                    Variables in &#123;&#125; will be joined automatically.
                </small>
            </div>
            <div className="mt-8 text-center">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-700">
                            Create Blog
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="custom-dialog-content">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Create Blog</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to create a new blog? This will send a request to Gemini API. Charges may apply.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <button className="bg-gray-500 text-white p-4 rounded shadow hover:bg-gray-700">
                                    Cancel
                                </button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <button
                                    className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-700"
                                    onClick={handleCreateBlog}
                                >
                                    Yes, create blog
                                </button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            {isLoading && (
                <div className="flex justify-center mt-8">
                    <ClimbingBoxLoader color="#36d7b7" />
                </div>
            )}
            {result && (
                <div className="mt-8 p-4 bg-gray-200 rounded">
                    <MarkdownRenderer content={result.blogContent} />
                </div>
            )}
        </>
    );

    async function handleCreateBlog() {
        if (!validatePrompt(customPrompt)) {
            return;
        }

        const selected_categories = selectedCategories.join(', ');
        let prompt = customPrompt.replace("{selected_categories}", selected_categories)
        if (selectedCategories.includes("AIC RMP")) {
            prompt += " Here is some background about AIC. (AIC) Atal Incubation Centre- Rambhau Mhalgi Prabodhini (RMP) Foundation has been set up in alignment with Atal Innovation Mission (AIM), NITI Aayog to nurture, handhold and support New Age Entrepreneurs for New Age India. The focus is on job creation through entrepreneurship in the domains of Agriculture, Education & ICT. It also aims to create & support sustainable business models at grassroot level including social enterprises. Vision: To inspire, nurture and handhold New Age Entrepreneurs for New India by steering the power of innovation and entrepreneurship.";
        }
        setIsLoading(true);
        try {
            const result = await createBlog(selectedCategories, prompt); // Pass the selected categories as parameters
            setResult(result);
            console.log("Blog created:", result, "with categories:", selectedCategories);
            // Implement logic to display the result.
        } catch (error) {
            console.error("Error creating blog:", error);
        } finally {
            setIsLoading(false);
        }
    }
}
