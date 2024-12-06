import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import axios from 'axios';

function CommentsList({ id, comments, onDelete, onEdit, onAdd }) {
  const [currentUser, SetcurrentUser] = useState(null);
  const token = Cookies.get('JWT_TOKEN');

  const fetchUserProfile = async () => {
    try {
      if (token) {
        const response = await axios.get("http://localhost:8080/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        SetcurrentUser(response.data.data);
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedNote, setEditedNote] = useState("");

  const handleEditClick = (id, note) => {
    setEditingCommentId(id);
    setEditedNote(note);
  };

  const handleSaveClick = (id) => {
    onEdit(id, editedNote);
    setEditingCommentId(null);
    setEditedNote("");
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
    setEditedNote("");
  };

  const handleDeleteClick = (id) => {
    onDelete(id);
  };

  const onSubmit = (data) => {
    // Gọi hàm onAdd với id và nội dung bình luận (data.noted)
    onAdd(id, data.noted);
    reset();  // Reset form sau khi gửi bình luận
  };

  return (
    <section className="main_blog_area p_100 p-0">
      <div className="container">
        <div className="s_comment_area" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="cm_title_br">Leave a comment</h3>
          <div className="s_comment_inner">
            <form className="row contact_us_form" >
              <div className="form-group col-md-12">
                <textarea
                  className="form-control"
                  id="message"
                  rows="2"
                  placeholder="Write your comment"
                  {...register("noted", { required: "Please enter a comment!" })}
                />
                {errors.noted && <p className="text-danger">{errors.noted.message}</p>}
              </div>
              <div className="form-group col-md-12">
                <button className="btn order_s_btn form-control" >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Comments List */}
        <div className="row blog_area_inner">
          <div className="col-lg-12">
            <div className="main_blog_inner single_blog_inner">
              <div>
                <div className="s_comment_list">
                  <div className="s_comment_list_inner">
                    {comments && Array.isArray(comments) && comments.length > 0 ? (
                      comments.map((item) => {
                        if (!item) return null;

                        // Check if the comment belongs to the current user
                        const isOwner = currentUser?.id === item.userId;

                        return (
                          <div className="media" key={item.id}>
                            <div className="d-flex">
                              <img src="/assets/images/img/comment/comment-1.jpg" alt="avatar" />
                            </div>
                            <div className="media-body">
                              <div className="d-flex justify-content-start align-items-center">
                                <h4 className="mb-0">{item.author}</h4>
                                {isOwner && (
                                  <div className="mx-4">
                                    <button
                                      className="btn"
                                      onClick={() => handleEditClick(item.id, item.noted)}
                                    >
                                      <i className="fa fa-edit" title="Edit"></i>
                                    </button>
                                    <button
                                      className="btn"
                                      onClick={() => handleDeleteClick(item.id)}
                                    >
                                      <i className="fa fa-trash" title="Delete"></i>
                                    </button>
                                  </div>
                                )}
                              </div>
                              <div className="comment-text">
                                {editingCommentId === item.id ? (
                                  <div>
                                    <textarea
                                      className="form-control"
                                      value={editedNote}
                                      onChange={(e) => setEditedNote(e.target.value)}
                                    />
                                    <div className="mt-2">
                                      <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleSaveClick(item.id)}
                                      >
                                        Save
                                      </button>
                                      <button
                                        className="btn btn-secondary btn-sm mx-2"
                                        onClick={handleCancelClick}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p>{item.noted}</p>
                                )}
                                <div className="comment-date text-muted">
                                  <span>
                                    {new Date(item.updateAt).toLocaleDateString("vi-VN")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No comments yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsList;
