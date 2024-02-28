
import {CardFooter, Image, Tab, Tabs,Chip ,  Card, CardBody} from "@nextui-org/react";
import { Link } from "react-router-dom";
import SectionHeading from "../../Shared/SectionHeadline";
import { Frown } from "lucide-react";

const FeatureProducts = ({categories, filteredProducts}) => {
    return (
        <div>
            <SectionHeading headingText={"Feature Products"}></SectionHeading>

            <Tabs aria-label="Dynamic tabs">
            {categories?.map(category => (
                <Tab
                key={category}
                value={category}
                title={
                    <div className="flex items-center space-x-2 mx-2">
                    <span>{category} </span>
                    {/* <Chip size="sm" variant="faded">{category.products.length}</Chip> */}
                    </div>
                }
                >
                <Card className="shadow-[#f0eded] shadow-lg px-0">
                    <CardBody className="bg-[#F9F9F9] ">
                    {filteredProducts && filteredProducts.length > 0 ?
                    (
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-6 gap-3">
                        {filteredProducts
                        .filter(product => product.category === category)
                        .map(product => (
                            <Link to={`/product/${product._id}`} key={product.id}>
                            <Card shadow="sm" isPressable>
                                <CardBody className="overflow-visible p-0 ">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={product.title}
                                    className="object-cover object-center md:h-[180px] mx-auto h-[140px] md:w-[180px] w-[140px] z-0"
                                    src={product.thumbnail}
                                />
                                </CardBody>
                                <CardFooter className="text-small justify-between items-end">
                                <div>
                                    <b>{product.title}</b>
                                    <p className="text-default-500 -ml-6">Price:</p>
                                </div>
                                <div>
                                    <p className="text-default-500">{product.price}$</p>
                                </div>
                                </CardFooter>
                            </Card>
                            </Link>
                        ))}
                    </div>
                    )
                    :
                    (
                        <div className='flex justify-center items-center border px-6 py-4 rounded-lg border-[#526D82] border-dashed '>
                            <div >
                                <div className='flex justify-center'> 
                                    <Frown  color='#526D82' />
                                </div> 
                                <h2 className='text-center text-[#253D47] md:text-x; text-lg my-2'>No products found</h2> 
                            </div>   
                        </div>
                    )
                    }
                    </CardBody>
                </Card>
                </Tab>
            ))}
        </Tabs>
        </div>
    );
}

export default FeatureProducts;
