class TweetsController < ApplicationController
  def index
    @tweets = Tweet.all.order(created_at: :desc)
    @tweet = Tweet.new
  end

  def create
    @tweet = Tweet.new(tweet_params)

    if @tweet.save
      # redirect_to tweets_path

      if request.xhr?
        respond_to do |format|
          format.html do
            render partial: "tweet", locals: {tweet: @tweet}
          end
          format.json {render json: @tweet}
        end
      end
    else
      render :index
    end
  end

  def destroy
  end

  private

  def tweet_params
    params.require(:tweet).permit(:message)
  end
end
