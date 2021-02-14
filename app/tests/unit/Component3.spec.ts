import { shallowMount, mount } from '@vue/test-utils'
import Component3 from '@/components/Component3.vue'
import SubComponent from '@/components/SubComponent.vue'
import Vue from 'vue'

describe('Component3.vue', () => {
  it('renders an image', async () => {
    const wrapper = mount(Component3, {})
    await Vue.nextTick() // use await Vue.nextTick() to wait for any possible render states after a data change
    const images = wrapper.findAll('img')
    expect(images).toHaveLength(1)
  })

  it('contains text from child components', async () => {
    const wrapper = mount(Component3, {
    })
    const subComp = wrapper.findComponent(SubComponent)
    expect(subComp.props().nameVal).toBe('Fox')
  })

  it('clicking the button will remove elements from DOM', async () => {
    const wrapper = mount(Component3)
    await Vue.nextTick()
    const btn = wrapper.findAll('button')    
    await btn.trigger('click')
    const images = wrapper.findAll('img')
    expect(wrapper.text()).toContain('Show Elements')
    expect(wrapper.text()).not.toContain(/leader/gi)
    expect(images).toHaveLength(0)
  })

})
