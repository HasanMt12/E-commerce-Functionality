import { Button, Input } from '@nextui-org/react';
import React from 'react';

const NewsLetter = () => {
    return (
        <div className="mt-10">
        <div className="newsletter-container">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
              <h3 className="text-4xl">Stay in the loop</h3>
              <p className="text-blue-200 text-lg">Join our newsletter to get top news before anyone else.</p>
            </div>
            <form className="w-full lg:w-1/2">
              <div className="flex flex-col sm:flex-row justify-center items-center max-w-xs mx-auto sm:max-w-md lg:max-w-none lg:py-12 md:py-8 py-4">
                <Input
                  type="email"
                  labelPlacement="outside"
                  radius="none"
                  label="Email"
                  variant="bordered"
                  className="font-semibold text-2xl lg:w-[70%] md:w-full w-full"
                />
                <Button
                  color="primary"
                  variant="flat"
                  radius="none"
                  className="mt-6 bg-[#EBECF0] hover:bg-[#202020] hover:text-[#EBECF0] text-[#202020]"
                >
                  SEND
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    );
}

export default NewsLetter;
