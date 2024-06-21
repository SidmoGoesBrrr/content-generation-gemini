// blog.ts

export async function createBlog(categories: string[], prompt: string) {
    const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories, prompt }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}
