import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import EditPost from "../components/EditPost"

const mockUpdate = jest.fn();
jest.mock('../mockedAPI/mockedAPI', () => ({
    updatePost: () => mockUpdate,
}))

describe('test editPost Component', () => {

    it('renders the editPost Component', () => {

        const postInfo = {
            id: "1",
            text: "It’s finally here! Catch our latest summer collection",
            // pic: "https://source.unsplash.com/random",
            pic: "/asset/photo.jpg",
            video: "",
            owner: "1",
            comments: [{ user: "yuting", comment: "Love your Post!" }, { user: "shuyue", comment: "hhhh" }],
            likes: [],
            createdTime: "March 19",
        };

        const mockAvatar = "/asset/photo.jpg";
        const mockUsername = "joe";

        render(
            <EditPost post={postInfo} avatar={mockAvatar} username={mockUsername} />
        );
        const updateBtn = screen.getByText("Update Post");
        userEvent.click(updateBtn);
    });

})